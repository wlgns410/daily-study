# 기본값반환을 하면 안되는 상황

?. || ''나 ?. || 0 같은 표현식은 기본값을 반환하는 데 유용할 수 있지만, 잘못된 타입을 예상치 못하게 변환하거나, 원치 않는 기본값으로 처리하여 문제를 감출 위험이 있다.

## 상황

```
const obj = { value: null }; // 혹은 예상치 못한 데이터
const result = obj?.value || ''; // 기본값 ''로 반환
console.log(result); // ''

User.find({code: result})
```

여기서 value가 null, undefined, 0, false, ''일 때 모두 ''로 변환된다.  
즉, 데이터 타입이 예상과 맞지 않아도 기본값이 반환되어 오류를 감출 위험이 있다.  
만약 데이터베이스에서 code가 빈 문자열인 데이터를 허용한다면, 불필요한 데이터가 반환되거나 잘못된 결과를 가져올 수 있어 문제가 발생한다.

```
const result = obj?.value || '0';
const user = await User.findOne({ code: result });
console.log(user.name); // TypeError: Cannot read property 'name' of null
```

위처럼 조회하면 안되는데 조회를 시도하려고 하고 code는 1부터 시작하니까 0이 없어서 예상치 못한 에러를 내뱉을 수 있다.

```
const obj = { value: null }; // 입력 데이터
const result = obj?.value;

if (!result) {
    throw new Error('Code is missing or invalid'); // 입력값 검증
}

const user = await User.findOne({ code: result });

if (!user) {
    throw new Error(`No user found for code: ${result}`); // 결과값 검증
}

console.log(user.name); // 안전하게 실행
```

따라서 예외처리를 다 해줘야 예상치 못한 에러를 막고 디버깅을 쉽게할 수 있다.

## 개선

```
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
```

물론 커스텀 에러 클래스나 핼퍼를 작성해서 중복 코드를 방지하는 것이 더 좋은 방법일 것이다.
