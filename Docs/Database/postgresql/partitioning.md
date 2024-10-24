# partitioning

하나의 테이블을 여러 개의 작은 파티션으로 나누는 것을 말하며, 대규모 데이터를 더 효과적으로 관리하고 성능 최적화를 꾀하는 방법으로 사용된다.  
테이블 자체는 하나로 보이지만, 내부적으로는 여러 개의 작은 테이블로 나뉘어져 관리하는 것을 말한다.

## 목적

1. 쿼리 성능 향상

- 데이터를 적절히 나누면 특정 범위의 데이터를 더 빠르게 검색할 수 있다.(찾아야하는 row 수가 줄어드니까 당연 -> 인덱스가 최적화 됨)

2. 데이터 관리

- 파티션 별로 관리해서 오래된 데이터거나 이동시켜야하는 데이터를 관리하기가 더 쉬워진다(데이터 많으면 덤프하는것도 오래걸리는데 이 시간도 줄어드는 것)

3. 병렬 처리

- 여러 파티션에 걸친 쿼리를 병렬로 처리할 수 있어 동시성이 향상되고 대용량 데이터를 효과적으로 처리할 수 있음

## 방법

파티셔닝은 주로 범위, 리스트, 해시 등을 기준 등으로 한다고 한다.

### 범위 파티셔닝

주로 날짜, 숫자와 같이 연속된 값의 범위로 테이블을 나누는 방식

```
-- 은행 거래 내역 테이블을 일별로 파티셔닝
CREATE TABLE transactions (
    transaction_id SERIAL,
    transaction_date DATE,
    customer_id INT,
    amount DECIMAL
)
PARTITION BY RANGE (transaction_date);

-- 2023년 1월 1일부터 2023년 1월 31일까지의 거래 내역을 저장할 파티션
CREATE TABLE transactions_202301 PARTITION OF transactions
    FOR VALUES FROM ('2023-01-01') TO ('2023-01-31');

-- 2023년 2월 1일부터 2023년 2월 28일까지의 거래 내역을 저장할 파티션
CREATE TABLE transactions_202302 PARTITION OF transactions
    FOR VALUES FROM ('2023-02-01') TO ('2023-02-28');
```

은행 데이터는 일, 월로 파티셔닝을 한다고 한다.  
이 경우 범위 파티셔닝에 해당될 것이다.

### 리스트 파티셔닝

특정 값의 목록을 기준으로 테이블을 나누는 방식으로 지역, 국가 코드 등으로 나누는 경우이다.

```
-- 부동산 거래 데이터를 시도별로 파티셔닝
CREATE TABLE real_estate_transactions (
    transaction_id SERIAL,
    region_code CHAR(2),  -- 예: 'SO'는 서울, 'BS'는 부산
    transaction_date DATE,
    property_price DECIMAL
)
PARTITION BY LIST (region_code);

-- 서울의 부동산 거래 데이터를 저장할 파티션
CREATE TABLE real_estate_seoul PARTITION OF real_estate_transactions
    FOR VALUES IN ('SO');

-- 부산의 부동산 거래 데이터를 저장할 파티션
CREATE TABLE real_estate_busan PARTITION OF real_estate_transactions
    FOR VALUES IN ('BS');
```

부동산 서비스는 지역별로 나누어 데이터를 관리할 수 있다.  
이 경우 시도별로 리스트 파티셔닝하면 각 지역의 부동산 거래 데이터를 효과적으로 관리할 수 있을 것이다.

### 해시 파티셔닝

데이터 값에 해시 함수를 적용하여 고르게 파티션에 나누는 방식  
데이터를 각 파티셔닝에 고루 분배하기 위함이다.

```
CREATE TABLE user_logs (
    user_id SERIAL,
    log_data TEXT
)
PARTITION BY HASH (user_id);

CREATE TABLE user_logs_part1 PARTITION OF user_logs
    FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE user_logs_part2 PARTITION OF user_logs
    FOR VALUES WITH (MODULUS 4, REMAINDER 1);
```

이 경우는 각 파티셔닝에 고루 데이터를 분배해야하는 경우므로 해당 도메인 별로 다를거라 어떤 케이스이다 말하기 어려울 것 같다.
