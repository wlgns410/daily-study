# DEFERRABLE INITIALLY DEFERRED

트리거 또는 외래 키 제약 조건(Foreign Key Constraints)에서 사용되는 옵션으로, 데이터베이스 트랜잭션이 완료될 때까지 해당 트리거 또는 제약 조건의 검사를 연기할 수 있도록 설정하는 옵션

- `DEFERRABLE` : 제약 조건(또는 트리거)이 "연기 가능"하다는 것을 나타냄. 트랜잭션이 완료될 때까지 해당 제약 조건을 미룰 수 있음
- `NOT DEFERRABLE` : DML 명령어가 실행될 때마다 즉시 제약 조건이 실행됨
- `INITIALLY DEFERRED` : 제약 조건이 트랜잭션 시작 시 기본적으로 연기된 상태임을 나타냄. 트랜잭션이 커밋될 때 제약 조건이 실행되며 조건 미충족하면 롤백함
- `INITIALLY IMMEDIATE` : 트랜잭션 시작될 때 즉시 실행됨. 제약 조건이 충족되지 않으면 실패하며 오류를 나타내고 작업이 롤백됨

## 예시

```
//상태 관리를 위한 테이블 생성
CREATE TABLE wms.refresh_inventory_flag (
	key VARCHAR(255) PRIMARY KEY DEFAULT 'inventory_refresh',
	value BOOLEAN DEFAULT FALSE
);

CREATE OR REPLACE FUNCTION set_refresh_flag()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO wms.refresh_inventory_flag (key, value)
    VALUES ('inventory_refresh', TRUE)
    ON CONFLICT (key) DO UPDATE
    SET value = TRUE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_flag_after_item_change
AFTER INSERT OR UPDATE OR DELETE ON master.items
FOR EACH ROW
EXECUTE FUNCTION set_refresh_flag();

CREATE OR REPLACE FUNCTION refresh_inventory_if_needed()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT value FROM wms.refresh_inventory_flag WHERE key = 'inventory_refresh') then
        REFRESH MATERIALIZED VIEW CONCURRENTLY wms.inventories;
        UPDATE wms.refresh_inventory_flag
        SET value = FALSE
        WHERE key = 'inventory_refresh';
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_flag_after_item_change
AFTER INSERT OR UPDATE OR DELETE ON master.items
FOR EACH ROW
EXECUTE FUNCTION set_refresh_flag();

CREATE CONSTRAINT TRIGGER refresh_inventory_at_commit
AFTER INSERT OR UPDATE OR DELETE ON master.items
DEFERRABLE INITIALLY DEFERRED // 여기
FOR EACH ROW
EXECUTE FUNCTION refresh_inventory_if_needed();
```

마치 낙관적 락처럼 버전 관리 대신 flag라는 물리적 테이블을 만들어서 inventory_refresh라는 key 값이 true일 동안에는  
`DEFERRABLE INITIALLY DEFERRED` 로 인해서 refresh_inventory_if_needed의 작업이 트랜잭션 작업의 after에 수행하게 만들 수 있다.

복잡한 트랜잭션: 데이터베이스에서 복잡한 트랜잭션 작업이 있는 경우, 이 옵션을 사용하면 제약 조건 위반 문제를 효과적으로 관리할 수 있음
