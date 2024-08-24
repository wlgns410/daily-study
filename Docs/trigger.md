# trigger

## 트리거란

트리거는 데이터베이스에서 특정 이벤트가 발생할 때 자동적으로 실행되는 사용자 정의 함수를 말한다.

데이터 무결성, 로깅, 계산된 필드 업데이트 등의 작업을 어플리케이션 단이 아니라 데이터베이스 단에서 처리할 때 사용한다.

## 구성요소

- event : 트리거가 실행될 조건을 말하며 cud 이벤트가 주 대상이다.
- condition : 이벤트 대상에 대한 조건을 추가할 수 있다.
- 시점 : 이벤트의 before, after, instead of 등 언제 트리거가 실행될 지 정할 수 있다.

```
BEFORE: 이벤트가 발생하기 전에 트리거가 실행
AFTER: 이벤트가 발생한 후에 트리거가 실행
INSTEAD OF: 이벤트가 발생하는 대신 트리거가 실행(주로 뷰에서 많이 사용)
```

## 예시

테이블이 이렇게 있다고 가정해보자.

```
CREATE TABLE mes.workers(
	id serial NOT NULL,
	user_code text NOT NULL,
	user_data jsonb,
	work_id integer NOT NULL,
	description text,
	created_at timestamptz,
	updated_at timestamptz,
	creator_user_code text,
	updater_user_code text,
	CONSTRAINT workers_pkey PRIMARY KEY (id)
)
```

```
CREATE OR REPLACE FUNCTION fill_user_data_on_worker_creation() RETURNS TRIGGER AS $$
BEGIN
  NEW.user_data := (
    SELECT to_jsonb(users.*)
    FROM master.users
    WHERE users.code = NEW.user_code
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER worker_creation_trigger
BEFORE INSERT ON mes.workers
FOR EACH ROW
EXECUTE FUNCTION fill_user_data_on_worker_creation();
```

NEW 라는 레코드를 사용해 insert된 데이터를 참조한다.  
worker가 추가되기 전(before) fill_user_data_on_worker_creation 함수를 호출하는 트리거가 실행되어 worker row에 같이 삽입되는 트리거이다.

## 트리거의 단점

- 코드 이해의 복잡성 : 트리거는 데이터베이스 내에서 비즈니스 로직을 캡슐화하므로, 트리거가 많아질 수록 어플리케이션 코드 외 트리거도 숙지하고 있어야 코드 이해가 될 수 있다.
- 디버깅의 난해함 : 해당 트리거는 코드로 남아있지 않다보니 해당 트리거 부분을 추적하기 어려워진다.
- 트리거의 처리 순서 : 트리거는 생성된 순서에 따라 실행되므로 트리거 순서 변경이 요구된다면 기존 트리거를 모두 제거하고 다시 생성해야한다.

## 트리거의 장점

- 코드베이스 간소화 : 어플리케이션 레벨에서 처리해야할 작업을 데이터베이스에 위임하여 어플리케이션 코드의 복잡성을 줄일 수 있다.
- 비즈니스 로직 재사용 : 트리거 로직은 모든 관련 작업에서 자동으로 실행되므로 동일한 로직을 재사용할 수 있다는 장점이 있다.

---

nested join 구조에서 로그를 삽입해야할 때, 코드베이스 말고 트리거로 삽입한다면 매우 쉽게 추가가 된다는 것을 알게되었다.

하지만, 트리거를 남발한다면 다른 팀원들과 같이 코드를 작업할 때 코드 이해도를 현저히 떨어트릴 수 있다는 것을 깨닳았다.

되도록 트리거보다는 hook을 사용해서 코드 베이스로 비즈니스 로직을 관리하는 것이 협업 환경에서 중요하지 않을까 생각이 들었다.
