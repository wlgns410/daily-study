# 용어 정리

- 공변성 : A가 B의 서브타입이면, `T<A>는 T<B>의 서브타입`
- 반공변성 : A가 B의 서브타입이면, `T<B>는 T<A>의 서브타입`
- 이변성 : A가 B의 서브타입이면, `T<A> → T<B>도 가능하고 T<B> → T<A> 도 가능`
- 불변성 : A가 B의 서브타입이지만, `T<A> → T<B>도 안 되고 T<B> → T<A>도 안됨`

## 매개변수는 반공변성?

타입스크립트에서 타입은 기본적으로 공변성 규칙을 따르지만, 함수의 매개변수는 반공변성을 갖고 있다.  
(참고 tsconfig의 strictFunctionTypes 옵션이 true로 설정되어야 반공변성을 가지고 있고, strict 모드가 아니라면 매개변수는 이변성을 가진다)

## 매개변수의 이변성과 반공변성 예시

```
interface Obj {
    method1(a: string | number | boolean): string
    method2(a: string | number) => string
    method3{
        (a: string | number): string
    }
}

declare const func: (a: stirng) => string

const obj: Obj = {
    method1: func,
    method2: func,
    method3: func,
}

console.log(obj)

```

method2, method3은 에러가 나지만 method1은 에러가 나지 않는다.  
그 이유는 `선언 방식`의 차이 때문인데, method1은 이변성을 띄고 method2, method3은 반공변성을 띄기 때문이다.

이변성이란 좁은타입에 대입해도 되고 넓은 타입에 대입 가능하다.  
공변성과 반공변성을 동시에 가지고 있고 그로 인해 어떤 객체든 허용 가능하다.

매개변수는 반공변성을 가지고 있어서 넓은 타입을 좁은 타입에 대입 가능하다.  
반대로 말하면 func에 string밖에 타입이 없으니 method2(a: string | number)인 넓은 타입에 대입할 수 없다는 것이다.

## Method Signature vs Function Signature & Call Signature

1. 메서드 시그니처

```
interface Obj {
    method1(a: string | number | boolean): string
}
```

메서드 시그니처에서는 TS가 기본적으로 이변성을 허용한다.  
이는 메서드가 객체의 일부로 선언될 때, 더 넓은 타입도 허용할 수 있다는 의미이다.  
메서드 시그니처를 사용하여 TS가 객체 메서드를 다룰 때 유연하게 처리할 수 있다.

2. Function Signature & Call Signature

```
method2(a: string | number) => string
method3{
    (a: string | number): string
}
```

반공변성을 띄며, 매개변수 타입의 넓은 대입을 허용하지 않습니다.  
이는 함수 자체가 독립적으로 선언되었을 때 발생하는 상황을 반영한 설계라고 한다.  
타입을 더 엄격하게 적용하고 싶다면 2번처럼 사용하는 것을 추천한다고 한다.

---

참고

[타입스크립트 교과서](https://www.youtube.com/shorts/WPeoQit2N_Y)
