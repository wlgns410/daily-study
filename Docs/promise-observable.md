# promise와 observable 차이

1. Promise

- 단일 값: Promise는 하나의 비동기 작업에 대해 단일 값(혹은 에러)을 반환한다. 한 번 해제(resolve)되면, 그 이후에는 더 이상 값을 방출하지 않는다.
- 즉시 실행: Promise가 생성되면, 그 안의 비동기 작업이 바로 시작
- 결과 불변: Promise는 한 번 상태가 결정되면(해제되거나 거부되면), 그 이후에는 변경되지 않음
- 처리방법 : then(), catch(), finally() 메서드를 사용해 결과를 처리

2. Observable

- 다중 값: Observable은 다수의 값(혹은 이벤트)을 방출할 수 있다.
- 지연 실행: Observable은 구독(subscription)이 이루어질 때까지 실행되지 않음
- 유연한 취소: Observable은 구독을 통해 언제든지 취소할 수 있다. 구독을 취소하면 더 이상 값을 방출하지 않으며, 비동기 작업도 중단될 수 있음
- 고급 연산: Observable은 map, filter, reduce, concat, merge와 같은 다양한 연산자를 제공하여, 비동기 데이터 스트림을 쉽게 처리할 수 있음

3. 차이점

Promise는 미래의 어떤 시점에 특정 형태의 결과를 제공하겠다라고 구현해 놓은 객체이다.  
한번에 하나의 값에만 async 비동기 처리를 한다.  
그래서 완료된 async 값을 resolve하면 더 이상 사용이 불가능하고 수정도 못한다.  
따라서 Promise 객체를 호출할 때 사용하는 함수명도 결과값인 then 이다.

Observable은 지속적으로 관찰 가능한 객체라는 뜻이다.  
변경될때마다 변경된 값을 비동기적으로 제공하겠다는 것을 구현한 객체이다.  
다수의 asynchronous 값을 emit할 수 있다.  
따라서 다수의 이벤트 스트림을 다루기 위한 목적으로 사용된다.

4. Promise.all과 Observable

Promise.all
병렬 비동기 작업을 처리할 때 유용함. 예를 들어, 여러 API 호출을 동시에 하고, 그 결과를 한 번에 받고 싶을 때 적합함  
즉, 여러 개의 Promise를 병렬로 실행하여, 모든 작업이 완료된 후 한 번에 결과를 처리할 때 사용

Observable
다중 이벤트나 데이터 스트림을 처리해야 할 때 유용하다. 예를 들어, 사용자 인터페이스의 이벤트 스트림, 실시간 데이터 스트림(예: 웹소켓) 등을 처리할 때 적합함  
즉, 시간에 따라 여러 값을 방출하고, 구독자가 그 값을 개별적으로 처리할 수 있도록 하는 비동기 스트림 처리 도구로 사용

---

참고

[observable vs promise](https://www.angular.kr/guide/comparing-observables)  
[차이점](https://sddev.tistory.com/100)
