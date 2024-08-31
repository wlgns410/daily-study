# any, unknown

## any

any 타입은 `어떤 타입이든 될 수 있다`는 것을 의미함  
TypeScript의 타입 검사기(Type Checker)가 any로 선언된 변수에 대해 모든 타입 체크를 무시하므로, any 타입을 사용하면 해당 변수는 마치 타입이 없는 것처럼 행동함

```
let value: any = "Hello";
value = 42;  // 숫자를 할당해도 오류 없음
value = {};  // 객체를 할당해도 오류 없음

value.testMethod();  // 컴파일러가 오류를 잡지 않음
```

타입 검사가 무력화되므로, 타입 안전성이 사라지고 런타임 오류가 발생할 가능성이 높아짐

## unknown

unknown 타입은 "어떤 타입인지 모른다"는 의미를 가짐  
unknown 타입은 any와 비슷하게 어떤 값이든 할당할 수 있지만, unknown 타입의 값을 사용할 때는 타입을 좁혀야 함
즉, unknown은 any보다 안전한 대체 옵션으로 사용하여 타입을 안전하게 확인한 후에만 사용할 수 있음

```
let value: unknown = "Hello";
value = 42;

// 직접적으로 사용하려고 하면 오류 발생
// value.testMethod();  // 컴파일 오류

// 타입 확인 후 사용 가능
if (typeof value === "string") {
    console.log(value.toLowerCase());  // 타입이 string으로 좁혀지게 한 다음에야 사용 가능
}
```

## 비교

### unknown vs void:

void는 함수가 아무것도 반환하지 않음을 나타냄  
unknown은 어떤 타입이든 될 수 있지만, 사용 전에 타입을 확인해야 함

### unknown vs null/undefined

null과 undefined는 값이 없음을 나타내는 타입  
unknown은 값이 무엇인지 모르는 상태를 나타내며, 그 값이 null, undefined, 또는 다른 타입일 수 있음(타입 정해두고 타입 좁히기하면 사용 가능)
