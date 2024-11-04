# join

## inner join

```
SELECT *
FROM tableA
INNER JOIN tableB
ON tableA.id = tableB.id;
```

일치하는 행만 반환  
INNER JOIN은 JOIN과 동일하다고 생각하면 됨

## LEFT JOIN (또는 LEFT OUTER JOIN)

```
SELECT *
FROM tableA
LEFT JOIN tableB
ON tableA.id = tableB.id;
```

일치하지 않는 행도 반환
tableA의 모든 행이 포함되며, tableB의 일치하는 행이 없으면 NULL 값이 채워짐
tableA를 기준으로 A는 다 있어야하고 추가적으로 tableB의 데이터가 필요할때 사용

## FULL OUTER JOIN

```
SELECT *
FROM tableA
FULL OUTER JOIN tableB
ON tableA.id = tableB.id;
```

두 테이블의 모든 행을 포함  
A나 B 둘 중 한개라도 있으면 NULL을 추가하고 값을 채움  
두 테이블의 모든 데이터를 포함한다

## 예시

```
SELECT a.*
FROM a
JOIN b ON a.itemCode = b.matItemCode
LEFT JOIN c ON a.itemCode = c.subItemCode WHERE c.subItemCode IS NULL;
```

a 테이블의 itemCode는 b 테이블의 matItemCode와 일치하고
a 테이블의 itemCode는 c 테이블의 subItemCode와 같지 않은 행만 반환한다.
