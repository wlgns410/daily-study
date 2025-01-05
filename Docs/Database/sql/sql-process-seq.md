# sql 처리 순서

## SQL 쿼리 처리 실행 순서

SQL 쿼리 처리 실행 순서는 아래 순서대로 이루어집니다.

1. FROM

데이터가 추출될 기본 테이블 또는 뷰를 지정합니다. JOIN이 있다면 이 단계에서 처리됩니다.

2. JOIN

테이블 간의 결합을 수행하여 데이터를 결합합니다.

3. WHERE

조건에 따라 행을 필터링합니다. 이 단계에서 인덱스를 활용하면 성능이 크게 개선됩니다.

4. GROUP BY

데이터를 그룹화합니다. 그룹화된 데이터는 개별 행이 아닌 그룹 단위로 처리됩니다.

5. HAVING

GROUP BY로 그룹화된 데이터에 조건을 적용합니다. 이 단계는 WHERE와 달리 그룹 단위로 조건을 필터링합니다.

6. SELECT

반환할 열을 선택합니다.

7. ORDER BY

결과를 정렬합니다.

8. OFFSET 및 LIMIT:

출력 시작 지점(OFFSET)과 반환할 최대 행 수(LIMIT)를 제한합니다.

---

## 안좋은 쿼리 예시

```
SELECT customer_id, SUM(order_total) AS total_spent
FROM orders
HAVING customer_id = 101 AND SUM(order_total) > 1000
GROUP BY customer_id;
```

이 쿼리는 고객 주문 데이터에서 특정 고객(customer_id = 101)의 총 지출 금액이 1000을 초과하는 고객을 찾는 예제이다.  
하지만 HAVING 절에서 customer_id = 101 조건을 사용하여 GROUP BY 이후에 데이터를 필터링하기 때문에, 모든 고객 데이터를 먼저 GROUP BY로 처리해야 한다.  
이로 인해 불필요한 데이터 처리 작업이 발생하여 성능이 저하된다.

## 개선된 쿼리

```
SELECT customer_id, SUM(order_total) AS total_spent
FROM orders
WHERE customer_id = 101
GROUP BY customer_id
HAVING SUM(order_total) > 1000;
```

customer_id = 101 조건을 WHERE 절로 이동하여, 먼저 고객 ID가 101인 데이터만 필터링한다.  
이를 통해 GROUP BY로 전달되는 데이터 양을 줄이고, 성능을 최적화한다.  
또한 SUM(order_total) > 1000 조건을 HAVING 절에서 처리한다.  
그룹화된 데이터에 대해 조건을 적용하는 것이므로 올바른 위치에 조건이 배치된다.

## 비교

### 문제 쿼리

```
FROM orders 테이블 전체를 가져옴
모든 데이터를 GROUP BY customer_id로 그룹화
그룹화된 데이터에 대해 HAVING 조건(customer_id = 101 AND SUM(order_total) > 1000)을 적용
```

### 개선 쿼리

```
FROM orders에서 WHERE customer_id = 101 조건으로 먼저 필터링
필터링된 데이터만 GROUP BY customer_id로 그룹화
그룹화된 데이터에 대해 HAVING 조건(SUM(order_total) > 1000)을 적용
```

---

[참고](https://www.youtube.com/watch?v=cwX-QR3gh_Y)
