# Advisory Lock

트랜잭션 A가 테이블 1을 잠그고 테이블 2에 접근하려고 하고,
트랜잭션 B는 테이블 2를 잠그고 테이블 1에 접근하려고 하는 경우,
두 트랜잭션이 서로의 잠금을 기다리면서 데드락이 발생한다.  
나의 경우에는 itemCode를 동시에 2개 이상의 통합테스트에서 사용하고 있었다.  
이를 jest를 이용한 여러개의 worker를 이용해 테스트를 진행했을 때, `inventory_refresh` 키가 데드락에 걸려 MView의 Refresh가 진행되지 않았다.

## Advisory Lock을 사용한 데드락 회피 전략이란?

Advisory Lock을 사용하면 데이터베이스의 물리적인 잠금 대신 논리적인 잠금을 설정할 수 있으므로, 적절히 사용하면 데드락을 회피할 수 있다.  
Advisory Lock은 세션 기반 또는 트랜잭션 기반으로 사용하는 것으로 낙관적 잠금이나 비관적 잠금 같은 전략을 직접 구현할 때 사용할 수 있다.  
트랜잭션 종료 시 자동 해제되는 배타적 락은 트랜잭션이 끝나면 종료된다.  
하지만, Advisory Lock은 다른 트랜잭션에서 동일한 잠금 키에 대해 잠금을 시도할 경우 경합이 발생하며, 잠금 해제될 때까지 대기하므로 동시성 제어를 할 수 있다.

`요약하면, 동일 키에 대해 여러 번 잠금을 걸고, 해제할 수 있는 advisory lock(다중 잠금 허용) vs 하나의 배타적 잠금만 허용하는 배타적 락`

### Advisory Lock

- 동시성 제어: Advisory Lock은 다른 트랜잭션에서 동일한 잠금 키에 대해 잠금을 시도할 경우 경합이 발생하며, 잠금 해제될 때까지 대기
- 데이터와 관계없는 논리적 잠금: Advisory Lock은 특정 데이터에 대한 잠금을 제공하지 않고, 응용 프로그램에서 사용하는 숫자 또는 키에 대한 논리적 잠금을 걸어 사용
- 동일한 키로 잠금 재요청 가능: 같은 세션에서 동일한 키에 대해 여러 번 잠금을 요청해도 항상 성공함. 잠금을 해제하려면 요청된 횟수만큼 해제해야 함

### Non-blocking 방식으로 잠금 처리

```
-- 트랜잭션 A가 리소스 1에 대해 잠금을 시도
SELECT pg_try_advisory_lock(1);

-- 잠금을 획득하지 못한 경우에만 다른 작업을 수행
IF NOT FOUND THEN
    -- 다른 작업 또는 잠금을 대기하는 대신 잠금을 포기하고 나중에 재시도
END IF;
```

`pg_try_advisory_lock`를 사용하여 잠금을 즉시 획득하지 못할 경우 다른 작업을 진행하거나, 잠금을 대기하지 않고 처리하는 방식으로 데드락을 피할 수 있다.

### 트랜잭션 범위 내에서 관리

트랜잭션 기반의 Advisory Lock을 사용하여 트랜잭션이 종료될 때 자동으로 잠금이 해제되도록 할 수 있다.
이렇게 하면 잠금을 명시적으로 해제하지 않더라도 트랜잭션이 끝나면 잠금이 해제되므로, 데드락을 방지할 수 있다.  
나는 이 2번째 방법인 트랜잭션 범위 내에서 락을 잡고 해제하도록 했다.

```bash
CREATE TABLE wms.refresh_inventory_flag (
	key VARCHAR(255) PRIMARY KEY DEFAULT 'inventory_refresh',
	value BOOLEAN DEFAULT FALSE
);

CREATE OR REPLACE FUNCTION wms.set_refresh_flag()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_advisory_xact_lock(9999);
    INSERT INTO wms.refresh_inventory_flag (key, value)
    VALUES ('inventory_refresh', TRUE)
    ON CONFLICT (key) DO UPDATE
    SET value = TRUE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

1. `wms.refresh_inventory_flag`을 이용하여 재고를 갱신할 필요가 있는지를 나타내기 위한 플래그 값을 저장한다.

- 기본적으로 재고 갱신 여부를 확인하거나 설정하기 위한 상태 플래그 테이블로 이용하는 것이다.

2. `set_refresh_flag`라는 트리거 함수를 생성한다.
3. `PERFORM pg_advisory_xact_lock(9999);`는 Advisory Lock을 사용해 9999번이라는 논리적인 잠금을 시도한다.

- 이 잠금은 트랜잭션 범위에서(`BEGIB~END`문 사이) 작성되서 트랜잭션이 종료되면 자동으로 해제된다.

4. `pg_advisory_xact_lock`을 사용하면, 동시에 여러 트랜잭션이 이 값을 업데이트하지 않도록 잠금을 설정한다(배타적 락 획득)
5. INSERT 문을 통해 key 값이 'inventory_refresh'인 경우에 value를 TRUE로 설정하는 쿼리를 실행한다.
6. `ON CONFLICT (key) DO UPDATE`을 통해 동일한 key가 존재하는 경우 insert 대신 업데이트가 실행된다.

- refresh_inventory_flag 테이블의 value 값이 TRUE로 설정되면, `재고 갱신 작업이 필요함`을 표시이므로 재고 갱신 작업을 실행하도록 설계된다.

7. 트리거 함수는 보통 변경된 행을 반환하는데, 여기서 `NEW`는 트리거가 실행되는 새로운 행을 반환하며 트랜잭션을 끝내게 된다.

### select와 perform

- `select` : 일반적인 SQL 명령어로, 쿼리 결과를 반환한다.
- `perform` : 결과를 반환하지 않는 쿼리를 실행할 때 사용된다. 즉, 쿼리의 결과값이 필요하지 않은 경우에 쓸 때 사용되며 트리거, 함수 호출할 때 사용된다.

---

[advisory lock](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-TABLES)
