# map 형변환

map 함수는 꼭 콜백 함수를 통해 배열을 변형하는 데만 사용하지 않고, 단순히 배열의 요소를 일괄적으로 형 변환할 때도 사용가능하다는 것을 알게되었다.

1. 숫자 배열을 문자열 배열로 변환

```
const numbers = [1, 2, 3];
const strings = numbers.map(String); // ["1", "2", "3"]
```

2. 문자열 배열을 숫자 배열로 변환

```
const strings = ["4", "5", "6"];
const numbers = strings.map(Number); // [4, 5, 6]
```

3. 불리언 값으로 변환 (참/거짓 평가)

```
const values = [0, 1, "", "hello"];
const booleans = values.map(Boolean); // [false, true, false, true]
```

4. 데이터 포맷 변환

```
const dates = ["2024-11-13", "2025-01-01", "2025-05-20"];
const formattedDates = dates.map(date => new Date(date).toLocaleDateString());
// 결과: ["11/13/2024", "1/1/2025", "5/20/2025"]
```

5. 객체 속성 변환

```
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];
const names = users.map(user => user.name); // ["Alice", "Bob", "Charlie"]
```

6. 배열 내 요소 값 변환

```
const futureAges = users.map(user => ({ ...user, age: user.age + 10 }));
// 결과: [{ name: "Alice", age: 35 }, { name: "Bob", age: 40 }, { name: "Charlie", age: 45 }]

const temperaturesCelsius = [0, 20, 30, 40];
const temperaturesFahrenheit = temperaturesCelsius.map(temp => temp * 9/5 + 32);
// 결과: [32, 68, 86, 104]
```

7. 비동기 일괄 처리

```
const urls = ["https://api.example.com/1", "https://api.example.com/2", "https://api.example.com/3"];
const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));

Promise.all(fetchPromises).then(results => console.log(results));
```

8. 조건에 따른 값 변환

```
const scores = [75, 85, 90, 60, 50];
const passFail = scores.map(score => score >= 70 ? "Pass" : "Fail");
// 결과: ["Pass", "Pass", "Pass", "Fail", "Fail"]
```

map을 사용하면 배열의 각 요소에 같은 작업을 일괄 적용할 수 있어 형변환이나 특정 함수 적용을 할 수 있어 간단하게 쓸 수 있다.  
그리고 데이터 형식 변환, 객체 속성 추출 및 수정, 비동기 작업 병렬 실행, 조건에 따른 변환 등에도 사용할 수 있다.  
map은 단순한 형 변환을 넘어서 배열의 각 요소에 일관성 있는 로직을 일괄 적용할 수 있다는 것을 알게 되었다.
