# PostgreSQL에서 지원하는 Materialized View 관련 옵션

## WITH DATA / WITH NO DATA

테이블 생성 시 데이터 채울건지 옵션 설정

- WITH DATA: Materialized View를 생성할 때 데이터를 즉시 채워서 물리적인 테이블을 생성한다. (기본값임)
- WITH NO DATA: Materialized View를 생성할 때 데이터를 채우지 않고, 빈 상태로 생성한다. 나중에 수동으로 REFRESH 명령어를 통해 데이터를 채울 수 있음

```
CREATE MATERIALIZED VIEW my_view
AS SELECT * FROM my_table
WITH NO DATA;
```

위처럼 데이터를 채우지 않고 생성할 수 있다.

## REFRESH MATERIALIZED VIEW

```
REFRESH MATERIALIZED VIEW my_view;
```

Materialized View는 기본적으로 자동 갱신되지 않기 때문에, 수동으로 갱신해야 한다.  
참고로 Orcale은 `Refresh를 하는 방법에는 FORCE, COMPLETE, FAST, NEVER` 을 제공하는데, Postgresql은 그렇게 제공하지는 않는다.  
하지만, 전체 Refresh만 제공하고 Oracle과 달리 변경된 데이터만 Refresh하는 옵션은 제공하지 않는다.  
따라서 한 MView가 너무 많은 역할을 하고 있다면, 적절히 분할하여 여러 MView로 쪼개는 방법도 생각해 볼만하다.

## CONCURRENTLY

PostgreSQL에서는 REFRESH MATERIALIZED VIEW 시 CONCURRENTLY 옵션을 사용할 수 있다.  
이 옵션을 사용하면 Materialized View가 갱신되는 동안에도 조회 작업이 가능하다.  
다만, 동시 읽기를 허용하면서 갱신하는 경우 성능 저하가 발생할 수 있어 CONCURRENTLY 갱신이 느려질 수 있다.

## Postgresql REFRESH MATERIALIZED VIEW의 문제

- 갱신 타이밍 문제: PostgreSQL Materialized View는 자동으로 갱신되지 않기 때문에 최신 데이터가 반영되지 않아 정합성 문제가 발생할 수 있다.
- 수동 갱신 중 경합 문제: REFRESH MATERIALIZED VIEW는 전체 MView를 Refresh하기 때문에 동작 중인 Materialized View는 잠금(Lock)이 걸려 다른 쿼리가 접근 시 경합 문제가 발생한다.
- CONCURRENTLY 옵션 사용시 동시성 문제 : 갱신 중에도 조회가 가능하다는 말은 갱신 이전의 데이터를 보여주고 있다는 의미이므로 갱신 이후의 데이터와 다른 정합성 문제가 발생한다.
- 데이터 갱신 빈도에 따른 정합성: 한 MView를 빈번하게 Refresh해야한다는 것은 Materialized View가 실시간 데이터를 정확히 반영하지 못할 가능성이 크다는 것이다. 따라서 실시간 트랜잭션 데이터나 로그 데이터처럼 빠르게 변화하는 데이터에는 사용하지 않고 조회용으로 많이 쓰는 것에 대해서 MView를 쓰는 것이 좋다.

## 대안

- 언제 갱신할 것인지에 대한 방안 : REFRESH MATERIALIZED VIEW를 트리거나 hook을 걸어 테이블에 데이터가 변경될 때마다 특정 작업을 수행하도록 한다.
- 실시간 데이터 정합성이 중요한 것(뱅킹) : Materialized View 대신 일반 View나 레디스 같은 캐싱 시스템을 사용해 볼 수 있을 것이다.
- 데이터베이스 변경 : 꼭 MView를 써야한다면, Oracle의 Materialized View는 FAST, FORCE 옵션 등을 제공하여 부분 갱신 가능하므로 데이터베이스 변경도 선택할만한 사항이다.

## Oracle의 Mview Refresh

```
Oracle의 Materialized View에서는 FAST, FORCE, COMPLETE 같은 옵션을 통해 갱신 방법을 제어할 수 있다.
FAST: 변경된 데이터만 갱신
FORCE: 가능하면 FAST를 사용하고, 불가능하면 전체 갱신을 수행
COMPLETE: 전체 데이터를 갱신
```

Oracle의 Materialized View는 FAST, FORCE 옵션 등을 제공하여 부분 갱신이 가능하므로, 데이터 정합성을 유지하는 데 더 유리하다.  
Oracle의 이런 기능으로 인해서 MView에서 데이터 소스의 변경을 즉시 반영하거나, 자동으로 갱신하여 데이터 정합성 문제에 있어 좋은 선택지 중 하나일 것이다.

---

참고

[oracle의 mview option](http://www.gurubee.net/lecture/1858)
