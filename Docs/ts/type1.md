# void, never, undefined, null

## void

```
function test(message: string): void {
    console.log(message);
    // no return
}
```

함수가 아무것도 반환하지 않을 경우 사용되는 타입  
이는 함수가 그저 어떤 작업을 수행하고, 그 결과로서 값을 반환하지 않도록 의도적으로 설계되었음을 나타낸다.

## never

```
function throwError(message: string): never {
    throw new Error(message); // exception
}
```

함수가 정상적으로 종료되지 않는 경우에 사용

```
function infiniteLoop(): never {
    while (true) { // 의도적인 무한 루프
    }
}
```

무한 루프를 포함한 함수에 사용  
이는 협업 환경에서 의도된 무한 루프문임을 알리는 것

```
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number, height: number };
   | { kind: "triangle"; base: number, height: number };  // 새로운 타입 추가되었다면

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "rectangle":
            return shape.width * shape.height;
        default:
            const _exhaustiveCheck: never = shape; // 여기서 never 타입 체크 실패해 컴파일 오류 발생
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`);
    }
}
```

TypeScript의 타입 체커가 코드에서 모든 가능한 경우를 처리했음을 보장할 수 있도록, never 타입을 사용해 컴파일 타임에 에러를 감지할 수 있도록 사용함

```
never 타입은 무한 루프나 항상 예외를 던지는 함수와 같이 정상적으로 끝나지 않는 함수를 명확하게 표현하는 방법을 말함
```

## undefined

```
function test(message: string): void {
    console.log(message);
    // no return
}
const result = test("Hello, World!");
console.log(result); // 출력: undefined
```

TypeScript에서는 undefined를 활용해 옵셔널 프로퍼티(있을 수도 있고 없을 수도 있는 프로퍼티)를 표현할 수 있음  
undefined는 변수가 초기화되지 않았거나, 함수가 명시적으로 값을 반환하지 않았을 때 사용됨  
따라서 함수가 undefined 값을 반환한다는 것은 함수가 반환할 값을 명시적으로 정하지 않았거나, 의도적으로 undefined를 반환하도록 설계되었음을 의미함  
그래서 함수가 return 문 없이 종료되면, JavaScript 엔진은 자동으로 undefined를 반환함

## null

null은 값이 의도적으로 비어 있음을 나타냄
개발자가 명시적으로 null을 할당하여 값이 없음을 표현할 때 사용

```
undefined는 값이 설정되지 않았거나 함수가 아무 값도 반환하지 않았음을 나타내며, 자동으로 할당될 수 있다. 의도적인 undefined도 가능하지만, 대부분은 시스템이나 언어가 할당한다.
null은 값이 없다는 것을 명시적으로 설정할 때 사용함. 이는 개발자가 의도적으로 "이 변수는 지금 값을 가지지 않는다"는 것을 나타내기 위한 것임

두 타입 모두 "없음"을 표현하지만, undefined는 "아직 할당되지 않음"을, null은 "의도적으로 비어 있음"을 나타냄
```
