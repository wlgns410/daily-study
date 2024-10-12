# 모듈 패턴

노출식 모듈 패턴과 즉시 실행 함수 표현에 대해 알아보자

## 즉시 실행 함수 표현 (IIFE)

함수를 정의함과 동시에 즉시 실행하는 패턴을 말한다.  
전역 변수를 피하고 스코프를 캡슐화하는 데 사용한다.

```
const Module = (() => {
    const privateVar = 'private임'

    console.log(privateVar)
})

console.log(privateVar) // // ReferenceError: privateVar is not defined


```

privateVar는 IIFE 내부에서만 유효한 지역 변수이며, 외부에서 접근할 수 없다.  
함수 내부에서 선언한 변수는 외부 범위에서 접근할 수 없다.  
선택적으로 내보내기 위해 return 된 것만 외부 범위에 전파할 수 있다.

## 노출식 모듈 패턴(Revealing Module Pattern)

IIFE와 객체 리터럴을 조합하여 캡슐화와 공개 API를 구현하는 패턴이다.  
공개하고 싶은 메서드와 변수만 노출하고, 나머지는 은닉하여 보호한다.

```
const module = (() => {
    let privateVar = 'private'
    let publicVar = 'public'

    const privateFunc = () => {
        console.log(privateVar)
    }

    const publicFunc = {
        show() {
            console.log(publicVar)
        }
    }

    return publicFunc
})()

module.show() // 'public'
```

비공개 데이터와 함수는 IIFE 내부에 정의되어 외부에서 접근할 수 없다.  
모듈 외부에서 접근해야 하는 공개 함수만 **return**을 통해 외부로 노출된다.
