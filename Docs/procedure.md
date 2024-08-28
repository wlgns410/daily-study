# procedure

## 프로시저란?

프로시저는 특정 작업을 수행하는 SQL 명령어들의 집합으로, 필요할 때마다 호출하여 실행할 수 있다.

## 함수와 차이점

```
CREATE OR REPLACE PROCEDURE update_employee_salary(
    emp_id INT,
    salary_increase NUMERIC,
    OUT success BOOLEAN
) AS
BEGIN
    -- 트랜잭션 시작
    BEGIN
        -- 기존 급여에 증가분을 더함
        UPDATE employees
        SET salary = salary + salary_increase
        WHERE id = emp_id;

        -- 트랜잭션 커밋
        COMMIT;

        -- 성공 상태 반환
        success := TRUE;
    EXCEPTION
        -- 오류 발생 시 롤백
        WHEN OTHERS THEN
            ROLLBACK;
            success := FALSE;
    END;
END;

```

```
CREATE OR REPLACE FUNCTION calculate_new_salary(
    emp_id INT,
    salary_increase NUMERIC
)
RETURN NUMERIC
AS
    current_salary NUMERIC;
BEGIN
    -- 현재 급여 조회
    SELECT salary INTO current_salary
    FROM employees
    WHERE id = emp_id;

    -- 새로운 급여 계산
    RETURN current_salary + salary_increase;
END;

```

<img width="700" alt="스크린샷 2024-08-28 오후 10 09 34" src="https://github.com/user-attachments/assets/9bb2db18-8930-4304-8f7c-f9c3c6b328e3">

## 프로시저의 단점

- 이식성 : 프로시저는 특정 데이터베이스 시스템에 종속적인 SQL 언어로 작성되기 때문에, 다른 데이터베이스 시스템으로 이식하기가 어렵다. psql로 작성한 프로시저는 다른 데이터베이스로 옮기려면 따로 작성해야한다.
- 유지보수 : 프로시저는 복잡한 로직을 포함할 수 있으며, 여러 개의 프로시저가 상호 작용할 수 있다. 이로 인해 코드의 복잡성이 증가하고, 유지보수가 어려워질 수 있다.
- 협업의 어려움 : 데이터베이스로 관리되기 때문에 git 코드 내에서 프로시저 공유를 위한 파일을 만들어야하는 번거로움이 있다.
- 디버깅 어려움: 오류 메시지가 불명확하거나, 프로시저 내에서 발생한 문제를 추적하기 어려운 경우가 생긴다.
- 테스트 환경 설정 어려움 : 각자 로컬 환경이 다를 수 있기 때문에 '내 pc에서는 됐었는데... 가 생길 경우가 많다.' -> 테스트컨테이너 만들어서 테스트 환경을 따로 만들면..?
- 로직의 분산 : 데이터베이스에 비즈니스로직 + 어플리케이션에 비즈니스로직 분산되어있으니 코드 이해도가 떨어질 수 있음
  etc...
