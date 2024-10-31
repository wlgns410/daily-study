# mssql between

MSSQL에서 날짜 범위를 지정할 때 BETWEEN을 사용하면 PostgreSQL과 비교 방식이 조금 달랐다.  
DATEPART 함수와 BETWEEN을 함께 사용할 때 MSSQL에서는 구체적인 날짜와 시간 부분을 포함하는 형식으로 범위를 지정해야했다.

```
const startDate = '2023-01-01';
const endDate = '2023-12-31 23:59:59';

Model.findAll({
  where: Sequelize.literal(`createdAt BETWEEN '${startDate}' AND '${endDate}'`)
});
```

이렇게 between을 사용해 직접 쿼리를 작성하거나

```
Model.findAll({
  where: Sequelize.literal(`
    DATEPART(year, createdAt) = 2023
    AND DATEPART(month, createdAt) BETWEEN 1 AND 6
  `)
});
```

DATEPART을 사용해야한다.  
DATEPART는 MSSQL에서 특정 날짜의 일부분(연도, 월, 일 등)을 추출할 때 사용하는 함수이다.

- Sequelize.literal : Sequelize가 직접 이해하지 못하는 SQL 구문을 문자열로 입력할 때 사용하는 기능
