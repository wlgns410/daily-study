# moleculer hook 사용

moleculer service layer에 작성된 after, before hook은 서비스 간 action call을 인터셉트해서 추가 동작을 하는 것이다.  
이 hooks는 moleculer 서비스의 ctx.call() 메서드를 통해 액션이 호출될 때만 적용된다는 것이다.  
이는 Moleculer가 제공하는 분산 어플리케이션 구조에서 특정 작업을 캡슐화하고 서비스 간 호출을 중앙에서 관리하기 위함이다.

## 왜 그렇까?

moleculer 구조와 액션 기반 접근 방식 때문이다.  
분산 시스템에서 서비스 간 통신을 하는 action이라는 단위로 통신을 관리한다.  
이 액션이 수행될 때, before, action hooks를 통해 요청 전/후로 로직을 추가할 수 있다.

repository 레이어에서 데이터베이스에 저장되는 상황은 서비스 레이어에서 해당 액션 호출에 대한 context에 대한 정보가 없기 때문에 moleculer hooks 시스템이 개입을 할 수가 없다.  
이 상황에서 hooks를 쓰고 싶다면, 데이터베이스에 trigger 함수를 써서 직접 데이터베이스 레벨에서 처리하도록 해야한다.

또는 해당 작업을 서비스의 action에 작성하여 ctx.call()로 호출한다면 hooks 시스템을 사용할 수 있겠지만, 기존 로직에 대한 많은 수정이 필요할 것이다.

## 결론

서비스레이어에서 어떤 행동(action)이 이뤄졌을 때 어떤 작업(after hook)이 이뤄지길 원한다면,
서비스 레이어의 ctx를 받아서 call을 해야 해당 context을 받아서 hook이 동작한다.  
반면, 레포지토리 레이어에서 저장이라는 이벤트가 일어났을 때, 어떤 동작이 이뤄지길 바란다면, 데이터베이스 단에서 trigger를 통해 function을 작성해서 후처리(after hook)을 처리해야한다.
