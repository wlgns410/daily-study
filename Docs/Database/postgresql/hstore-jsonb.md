# hstore과 jsonb 타입

hstore와 jsonb는 PostgreSQL에서 키-값 스토리지를 지원하는 두 가지 데이터 타입이다.  
유사하지만 미묘하게 다른 점이 있다.

## hstore

키-값 쌍을 저장할 수 있는 단순한 데이터 타입이다.  
hstore는 단순히 텍스트 형식의 키와 값을 저장하는 데 적합하며 구조화된 데이터나 중첩된 데이터는 지원하지 않는다는 특징이 있다.  
GIN 및 GiST 인덱스를 사용하여 키-값 쿼리를 최적화할 수 있다.

```
-- hstore 데이터 삽입
CREATE TABLE example (data hstore);

INSERT INTO example (data) VALUES ('key1 => value1, key2 => value2');

-- 특정 키의 값 조회
SELECT data -> 'key1' FROM example;
```

## jsonb

JSON 형식의 데이터를 이진 형태로 저장하는 데이터 타입이다.  
 JSON 데이터를 효율적으로 검색하고, 변경할 수 있는 기능을 제공한다.

- 구조화된 데이터: jsonb는 JSON 형식의 데이터를 그대로 저장할 수 있으며, 배열, 중첩된 객체, 숫자, 문자열 등의 다양한 데이터 타입을 지원
- 인덱싱 지원: jsonb는 GIN, GiST 및 다른 인덱스를 사용하여 JSON 데이터를 효율적으로 검색
- 유연성: jsonb는 JSON 데이터 구조를 그대로 유지하면서 저장하고 검색할 수 있음. 이로 인해 복잡한 데이터 구조를 유연하게 처리함
- 정렬: jsonb는 데이터를 정렬된 형태로 저장하며, JSON 객체 내부에서 키 순서가 강제되지 않지만 빠른 검색을 위해 최적화함

```
-- jsonb 테이블 생성
CREATE TABLE example2 (
  id serial PRIMARY KEY,
  data jsonb
);

-- 중첩된 jsonb 데이터 삽입
INSERT INTO example2 (data)
VALUES ('{
  "name": "hoon",
  "address": {
    "city": "ansan",
    "zipcode": "00000"
  },
  "contacts": [
    {"type": "email", "value": "hoon@gmail.com"},
    {"type": "phone", "value": "010-0000-0000"}
  ]
}');

-- 중첩된 데이터에서 특정 값 쿼리
-- 주소(city) 가져오기
SELECT data->'address'->>'city' AS city FROM example2;

-- 첫 번째 연락처 정보 가져오기 (contacts 배열의 첫 번째 요소)
SELECT data->'contacts'->0->>'value' AS first_contact FROM example2;

-- 모든 연락처 정보 가져오기
SELECT jsonb_array_elements(data->'contacts')->>'value' AS contact_info FROM example2;
```

PostgreSQL 9.4부터 **jsonb**가 도입되면서, 복잡한 JSON 데이터를 저장하고 처리하는 데 더 적합하다고 느껴서
이후 많은 애플리케이션이 jsonb로 전환하면서 hstore 사용이 줄어들었다고 한다.  
또한 JSON 표준과 호환되므로, API와 데이터 통신에서 유리하기도 하다.

```
-- GIN 인덱스 생성
CREATE INDEX idx_jsonb_data_gin ON example_jsonb USING gin(data);

-- 특정 키-값 쌍을 포함하는 레코드 조회 (contacts 배열에 "phone"이 있는지)
SELECT * FROM example_jsonb
WHERE data @> '{"contacts": [{"type": "phone"}]}';
```

@> 연산자는 jsonb의 특정 필드에 JSON 객체가 포함되어 있는지를 확인하는 연산자이다.  
GIN 인덱스가 적용되어 있으면 이러한 쿼리는 매우 빠르게 수행한다.
