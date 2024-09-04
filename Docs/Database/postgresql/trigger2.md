# instead of

기본적으로 뷰는 데이터를 저장하지 않기 때문에, 뷰에 대한 DML 작업이 발생했을 때 이를 처리하는 대신  
트리거가 작동하여 실제 테이블에 데이터를 삽입하거나 수정하기 위해 많이 사용하곤 함

## 예시

```
CREATE OR REPLACE FUNCTION insert_employee_department()
RETURNS TRIGGER AS $$
BEGIN
    -- departments 테이블에 먼저 새로운 부서를 삽입하고
    INSERT INTO departments (department_name) VALUES (NEW.department_name)
    ON CONFLICT (department_name) DO NOTHING;

    -- employees 테이블에 직원 정보를 삽입, 삽입된 부서의 id 사용
    INSERT INTO employees (employee_name, department_id)
    VALUES (NEW.employee_name, (SELECT department_id FROM departments WHERE department_name = NEW.department_name));

    RETURN NULL; -- INSTEAD OF 트리거는 VIEW를 수정하지 않으므로 NULL을 반환
END;
$$ LANGUAGE plpgsql;

-- INSTEAD OF 트리거 설정 (뷰에 대한 INSERT 작업을 처리)
CREATE TRIGGER instead_of_insert
INSTEAD OF INSERT ON employee_department_view
FOR EACH ROW
EXECUTE FUNCTION insert_employee_department();

```

뷰에 INSERT 작업을 시도할 때, INSTEAD OF 트리거를 사용하여 실제로는 employees 테이블과 departments 테이블에 데이터를 삽입하는 트리거를 만듦
