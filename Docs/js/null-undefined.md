# null과 Undefined

프론트엔드에서 API 호출 시, 특정 필드가 undefined인지 null인지를 구별하면, 백엔드에서 데이터가 누락된 상태인지 의도적으로 비어있는 상태인지 알 수 있다.

- undefined로 전달: 특정 값이 아예 입력되지 않았을 때이다. 이를 통해 백엔드는 이 값이 누락된 것인지 확인할 수 있다.
- null로 전달: 값이 의도적으로 비어 있음을 전달한다. 예를 들어, 데이터베이스에서 해당 필드를 비워야 하는지, 기본값을 설정하지 않고 null로 처리해야 하는지를 알 수 있다.

이처럼 통일된 규칙을 만들어야한다.

## 이유

혼란 방지: 다양한 값(null, '', "0", undefined)이 섞여서 전달되면 코드의 가독성이 떨어지고, 예상하지 못한 동작이 발생할 가능성이 커진다.  
예를 들어, 빈 문자열 ''이나 "0"이 전달되면, 백엔드는 이를 유효한 값으로 간주할 수 있기 때문에 데이터를 비우거나 기본값을 설정하는 상황에서 혼란이 생길 수 있게 된다.

1. 문자열 변환(String() 또는 .toString() 사용 시 문제)

```
function handleValue(value) {
    const stringValue = String(value); // 문자열 변환

    if (stringValue === '') {
        console.log("빈 문자열로 인식됨:", stringValue);
    } else {
        console.log("문자열 값:", stringValue);
    }
}

handleValue(undefined);   // 출력: 빈 문자열로 인식됨: "undefined"
handleValue(null);        // 출력: 빈 문자열로 인식됨: ""
handleValue(0);           // 출력: 문자열 값: "0"
handleValue('');          // 출력: 빈 문자열로 인식됨: ""
```

위처럼 문제가 생길 수 있다.

2. 숫자 변환(Number() 사용 시 문제)

```
function handleNumericValue(value) {
    const numericValue = Number(value); // 숫자 변환

    if (isNaN(numericValue)) {
        console.log("숫자가 아님:", numericValue);
    } else {
        console.log("숫자 값:", numericValue);
    }
}

handleNumericValue(undefined);  // 출력: 숫자가 아님: NaN
handleNumericValue(null);       // 출력: 숫자 값: 0
handleNumericValue(0);          // 출력: 숫자 값: 0
handleNumericValue('');         // 출력: 숫자 값: 0
handleNumericValue('0');        // 출력: 숫자 값: 0
handleNumericValue('abc');      // 출력: 숫자가 아님: NaN
```

null, 빈 문자열 '', 그리고 문자열 "0"은 숫자 변환 시 모두 **숫자 0**이 되어 혼란을 일으킬 수 있다.
