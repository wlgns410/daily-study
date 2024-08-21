# RxJS

## RxJS란?

```
import { Observable, of } from 'rxjs';
```

`RxJS (Reactive Extensions for JavaScript)` 는 비동기 및 이벤트 기반 프로그래밍을 지원해주는 라이브러리입니다.  
`Observable` 은 RxJS 라이브러리에서 데이터의 흐름(스트림)을 나타내는 객체를 말합니다.  
이 스트림은 비동기적(async)으로 데이터(이벤트, 값 등등)을 전달할 수 있습니다.

`Observer` 는 스트림에서 데이터를 구독(subscribe)하고 새로운 데이터가 있을 때마다 이벤트 기반으로 코드가 동작합니다.  
`Operators` 는 Observable의 데이터 스트림을 변형하거나 필터링할 때 사용합니다. 따라서 데이터를 지연시키거나, 특정 조건 필터링한 데이터만 전달 가능하게 해줍니다.

## 데이터를 비동기적으로 전달하는 스트림이란?

`Stream` 은 시간에 따라 전달되는 데이터의 흐름을 말합니다. 이 스트림은 데이터, 이벤트 그리고 다른 값등을 포함할 수 있습니다.

```
return of(data).pipe(
      delay(1000),
      map((items) => items.map((item) => item.toUpperCase())), // 1초 후 모든 데이터를 대문자로 변환
    );
```

위 코드처럼 데이터가 즉시 전달되지 않고 1초 지연이라는 조건을 거치고 전달되므로 비동기적으로 데이터가 전달되고 있습니다.  
이 과정은 비동기적으로 일어나며, 이벤트가 발생할 때마다 새로운 데이터가 전달되는 것이 비동기라고 합니다.

## 비동기 스트림으로 전달하는 이유

동기 프로그래밍에서는 작업이 순차적으로 실행됩니다. 그러나, 비동기 작업이 필요할 때(예: 네트워크 요청, 사용자 입력 대기 등) 동기적으로 처리하려면 코드가 복잡해지고, 특히 여러 비동기 작업이 서로 종속적일 때 문제가 발생합니다.

```
// 콜백 헬의 예시
doSomethingAsync((result1) => {
  doSomethingElseAsync(result1, (result2) => {
    doAnotherThingAsync(result2, (result3) => {
      // ...
    });
  });
});
```

```
// RxJS를 사용한 비동기 작업 관리
of(value)
  .pipe(
    switchMap(doSomethingAsync),
    switchMap(doSomethingElseAsync),
    switchMap(doAnotherThingAsync)
  )
  .subscribe(result => {
    // 최종 결과 처리
  });

```

RxJS의 스트림: RxJS에서는 이러한 비동기 작업을 스트림으로 처리하여, 콜백의 중첩 없이도 복잡한 비동기 로직을 단순하고 일관된 방식으로 작성할 수 있습니다. 예를 들어, 비동기 작업들을 pipe로 연결하고 switchMap를 이용해 종속적인 비동기 작업을 편리하게 작성할 수 있게 됩니다.

참고로 switchMap 연산자는 이전 Observable의 결과를 사용하여 새로운 Observable을 반환하고, 이 새로운 Observable의 결과로 계속 작업을 수행합니다. 이 연산자를 사용하면 종속적인 비동기 작업을 순차적으로 처리하기가 매우 편리해집니다.

1. of는 RxJS의 함수로, 주어진 값을 Observable로 변환합니다. 즉, of 함수는 주어진 값(value)을 Observable 스트림으로 감싸서 반환합니다.
2. pipe로 비동기 작업들을 연결합니다.
3. switchMap 연산자로 비동기 작업이 완료되면 그 결과를 다음 switchMap 연산자로 전달하는 작업을 반복합니다.
4. subscribe 메서드로 Observable 구독을 통해 Observable에서 방출되는 데이터를 처리합니다.

요약

- 가독성: 종속적인 비동기 작업을 순차적으로 나열하면서도 코드가 직관적이고 읽기 쉽습니다. 콜백 지옥이나 then 체이닝으로 인한 복잡함을 피할 수 있습니다.
- 에러 관리: pipe 연산자 체인을 사용하면 에러를 처리하거나 특정 조건에 따라 작업을 취소하는 로직도 쉽게 추가할 수 있습니다.
- 유연성: 각 단계에서 데이터를 쉽게 변형하거나 조합할 수 있으며, 필요에 따라 중간에 작업을 취소하거나 새로운 작업을 삽입할 수 있습니다.

## subscribe

subscribe는 RxJS에서 Observable을 사용하여 스트림에서 데이터를 받을 때 사용하는 메서드입니다. 구체적으로 말하자면, subscribe는 Observable을 구독(Subscribe)하고, 이 구독을 통해 Observable에서 방출되는 데이터를 처리하거나, 에러가 발생했을 때의 동작을 정의하거나, 스트림이 완료되었을 때의 동작을 정의하는 역할을 합니다.

`Observable` 은 데이터의 흐름(스트림)을 나타내며, 비동기적으로 데이터를 방출(emit)할 수 있습니다. Observable 자체는 데이터를 `준비`하지만, 이 데이터를 사용하려면 누군가가 구독을 해야 합니다.

`Subscribe` 는 이 Observable을 구독하여 실제로 데이터가 방출될 때 이를 받아 처리할 수 있게 합니다. Observable은 구독자가 없으면 데이터를 방출하지 않습니다. `구독`이 이루어져야 Observable이 데이터를 보낼 수 있습니다.

```
import { of } from 'rxjs';

const observable = of('하나', '둘', '셋');

observable.subscribe({
  next(value) {
    console.log(`Received value: ${value}`);
  },
  error(err) {
    console.error(`Error occurred: ${err}`);
  },
  complete() {
    console.log('Observable has completed.');
  }
});

```

```
subscribe 메서드는 세 가지 주요 콜백 함수를 받을 수 있습니다
next: Observable이 데이터를 방출할 때 호출됩니다.
error: Observable의 스트림에서 에러가 발생했을 때 호출됩니다.
complete: Observable의 스트림이 정상적으로 완료되었을 때 호출됩니다.
```

- next: 1, 2, 3이 방출될 때마다 이 콜백이 호출되어 값을 출력합니다.
- error: 스트림에서 에러가 발생할 경우 호출됩니다. 이 예제에서는 에러가 발생하지 않으므로 호출되지 않습니다.
- complete: Observable이 데이터를 모두 방출하고 종료되면 호출됩니다. 이 예제에서는 3이 방출된 후 complete가 호출됩니다.

따라서 subscribe를 사용하면 Observable에서 방출되는 데이터를 실시간으로 처리하여 비동기 작업을 관리할 수 있게 됩니다.
