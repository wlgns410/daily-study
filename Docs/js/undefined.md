# js undefined

js에서 undefined는 암묵적 형 변환(coercion)으로 인해 undefined가 자동으로 "undefined"라는 문자열로 변환된다.  
코드를 짜다가 갑자기 만나 에러를 발견해서 정리했다.  

```
EmpSeq: params.EmpSeq ? (String(params.EmpSeq) === '0' ? userSeq : String(params.EmpSeq)) : userSeq,
```

이럴때 params.EmpSeq가 undefined인 경우, String(params.EmpSeq)로 형 변환하면 문자열 "undefined"가 되었다.  
그래서 '0' 이라고 판단하지 못하고 userSeq로 대체되는 문제가 발생했다.

## 이유

JavaScript에서 undefined를 String()으로 변환하면 "undefined"라는 문자열로 변환된다고 한다.  
이는 JavaScript의 암묵적 형 변환 규칙에 따른 동작이라고 한다.  

## 해결방법

타입 체커나 타입스크립트 기능을 통해 타입이 확실히 정해졌는지 확인하거나 조건을 명시적으로 추가하여 undefined인 경우를 처리하면 된다.  
