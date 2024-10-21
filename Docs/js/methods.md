# js 메서드들

## Math

### Math.max

```
console.log(Math.max(1, 2, 3, 4)); // 4

// 배열을 사용할 경우 스프레드 연산자를 사용
const arr = [1, 2, 3, 4];
console.log(Math.max(...arr)); // 4
```

### Math.min

```
console.log(Math.min(1, 2, 3, 4)); // 1

// 배열을 사용할 경우 스프레드 연산자를 사용
const arr = [1, 2, 3, 4];
console.log(Math.min(...arr)); // 1
```

### Math.abs

```
console.log(Math.abs(-5)); // 5
console.log(Math.abs(3));  // 3
```

### Math.pow

```
console.log(Math.pow(2, 3)); // 8 (2^3)
console.log(Math.pow(5, 2)); // 25 (5^2)
```

### Math.sqrt

```
console.log(Math.sqrt(16)); // 4
console.log(Math.sqrt(25)); // 5
```

### Math.round, floor, ceil, trunc

```
console.log(Math.round(4.7)); // 5
console.log(Math.round(4.4)); // 4

console.log(Math.floor(4.7)); // 4
console.log(Math.floor(4.4)); // 4

console.log(Math.ceil(4.1)); // 5
console.log(Math.ceil(4.9)); // 5

console.log(Math.trunc(4.9)); // 4
console.log(Math.trunc(-4.9)); // -4
```

### Math.random

0 이상 1 미만의 난수를 반환

```
console.log(Math.random());  // 예: 0.56789

const randomNum = Math.floor(Math.random() * 10) + 1; // 1부터 10 사이의 난수
console.log(randomNum);
```

### sum

Math에는 sum 함수가 없으므로 reduce를 사용하여 배열의 요소를 더해 구함

```
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, curr) => acc + curr, 0); // 0은 초기값
console.log(sum); // 15
```

### startsWith

문자열이 특정 문자열로 시작하는지 확인

```
const str = "hello world";
console.log(str.startsWith("hello")); // true
console.log(str.startsWith("world")); // false
```

### includes

문자열이 특정 문자열을 포함하는지 확인

```
const str = "hello world";
console.log(str.includes("world")); // true
console.log(str.includes("hey"));   // false
```

### indexOf

문자열 내에서 특정 문자열의 첫 번째 인덱스를 반환하며, 찾지 못하면 -1을 반환

```
const str = "hello world";
console.log(str.indexOf("world")); // 6
console.log(str.indexOf("hey"));   // -1
```

### slice

문자열의 특정 부분을 잘라내 반환  
음수 인덱스도 사용 가능

```
const str = "hello world";
console.log(str.slice(0, 5)); // "hello"
console.log(str.slice(-5));   // "world"
```

### substring

slice()와 유사하지만, 음수 인덱스를 지원하지 않음

```
const str = "hello world";
console.log(str.substring(0, 5)); // "hello"
```

### splice

배열에서 요소를 추가, 제거 또는 교체하는 메서드

```
array.splice(startIndex, deleteCount, item1, item2, ..., itemN);

newArray.splice(s, e - s + 1, ...reversedPart);
```

startIndex: 배열에서 변경이 시작될 인덱스
deleteCount: 배열에서 제거할 요소의 개수
item1, item2, ..., itemN: 배열에 추가할 새로운 요소

### replace

첫 번째로 발견된 특정 문자열을 대체

```
const str = "hello world";
console.log(str.replace("world", "there")); // "hello there"
```

### toLowerCase

문자열을 소문자로 변환

```
const str = "Hello World";
console.log(str.toLowerCase()); // "hello world"
```

### toUpperCase

문자열을 대문자로 변환

```
const str = "hello world";
console.log(str.toUpperCase()); // "HELLO WORLD"
```

### trim

양끝 공백 제거  
왼쪽, 오른쪽 공백만 제거하는 메서드도 존재

```
const str = "   hello world   ";
console.log(str.trim()); // "hello world"
```

### repeat

문자열을 주어진 횟수만큼 반복

```
const str = "hello";
console.log(str.repeat(3)); // "hellohellohello"
```

### join

배열의 요소를 특정 구분자로 합쳐서 문자열로 반환

```
newArray.join("");
```

### split

특정 구분자를 기준으로 문자열을 나누어 배열로 반환

```
my_string.split("");
```

### reverse()

배열일 때 sort 순서를 바꿀 수 있게 해준다.

```
newArray.slice(s, e).reverse();
```

### map()

배열의 각 요소에 제공된 함수를 호출한 결과를 새 배열로 반환

```
const arr = [1, 2, 3, 4];
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]
```

```
const newArray = num_list.map((elem, idx) => {
        if(idx % 2 === 0){
            return elem
        }
    }) // [4,null,6,null,7,null] -> 모든 요소가 필터링 되지 않고 null으로라도 담김
```

map()의 콜백 함수는 3개의 매개변수를 받을 수 있음

현재 요소 (element)
현재 요소의 인덱스 (index)
배열 자체 (array)

map()은 배열을 변환하는 데 사용되지만, 모든 요소에 대해 무언가를 반환해야 하기 때문에 원하는 대로 특정 조건에 맞는 요소만을 새로운 배열에 담으려면 filter 사용하는게 남

### filter()

배열의 각 요소에 대해 제공된 함수의 결과가 true인 요소들로 새 배열을 리턴

```
const arr = [1, 2, 3, 4];
const evens = arr.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

const newArray = num_list.filter((elem, idx) => {
        if(idx % n === 0 ){
            return elem
        }
    }) // map과 달리 필터링된 요소만 새 배열에 담김
```

filter() 메서드도 map()과 마찬가지로 세 가지 매개변수를 받을 수 있음

현재 요소 값 (element)
현재 요소의 인덱스 (index)
배열 자체 (array)

### reduce

배열의 모든 요소를 순회하면서, 제공된 함수에 따라 하나의 값으로 축약(누적합, 누적곱 etc...)

```
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

### find

배열에서 제공된 함수의 조건을 만족하는 첫 번째 요소를 반환, 찾지 못하면 undefined

```
const arr = [1, 2, 3, 4];
const firstEven = arr.find(x => x % 2 === 0);
console.log(firstEven); // 2
```

### findIndex()

배열에서 제공된 함수의 조건을 만족하는 첫 번째 요소의 인덱스를 반환, 찾지 못하면 -1

```
const arr = [1, 2, 3, 4];
const index = arr.findIndex(x => x === 3);
console.log(index); // 2
```

### every()

배열의 모든 요소가 제공된 함수의 조건을 만족하면 true, 그렇지 않으면 false

```

const arr = [1, 2, 3, 4];
const allEven = arr.every(x => x % 2 === 0);
console.log(allEven); // false 모든 요소가 나머지가 0이 아니기 때문

```

### some()

배열의 일부 요소가 제공된 함수의 조건을 만족하면 true, 그렇지 않으면 false

```

const arr = [1, 3, 5];
const hasEven = arr.some(x => x % 2 === 0);
console.log(hasEven); // false - 1개도 없기 때문

```

### sort()

배열을 정렬. 기본적으로 문자열로 정렬하므로 숫자를 정렬할 경우 함수를 제공해야 함

```

const arr = [3, 1, 4, 1, 5];
arr.sort((a, b) => a - b);
console.log(arr); // [1, 1, 3, 4, 5]

```

### flat()

중첩된 배열을 1차 배열로 만들어 새로운 배열로 반환

```

const arr = [1, [2, 3], [4, [5, 6]]];
console.log(arr.flat());
// 출력: [1, 2, 3, 4, [5, 6]] (한 단계만 평탄화)

const arr = [1, [2, [3, [4, [5]]]]];
console.log(arr.flat(2)); // 내가 값을 넣으면 됨
// 출력: [1, 2, 3, [4, [5]]] (2단계 평탄화)

```

```

const arr = [1, [2, [3, [4, [5]]]]];
console.log(arr.flat(Infinity));
// 출력: [1, 2, 3, 4, 5] (모든 중첩 배열 평탄화시킴)

```

### flatMap()

배열을 먼저 매핑하고 그 결과를 평탄화

```

const arr = [1, 2, 3];
console.log(arr.flatMap(x => [x * 2])); // [2, 4, 6]

```

### Object.keys()

객체의 모든 key를 가지고 배열로 반환

```

const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // ['a', 'b', 'c']

```

### Object.values()

객체의 모든 value를 배열로 반환

```

const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj)); // [1, 2, 3]

```

### Object.entries()

객체의 [키, 값] 쌍을 배열로 반환

```

const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]

```

### setTimeout() / setInterval()

특정 시간 후에 코드 실행 / 일정 시간 간격으로 코드 실행

```

setTimeout(() => console.log("1초 후 실행"), 1000);

const intervalId = setInterval(() => console.log("1초마다 실행"), 1000);
clearInterval(intervalId); // 멈추기

```

### JSON.stringify()

자바스크립트 객체를 JSON 문자열로 변환
직렬화(serialization)라고 함
js 객체를 json 문자열로 바꿔 클라이언트가 읽을 수 있는 형태로 만드는 것

```

const obj = { a: 1, b: 2 };
console.log(JSON.stringify(obj)); // '{"a":1,"b":2}'

```

### JSON.parse()

JSON 문자열을 자바스크립트 객체로 변환
반직렬화(deserialization)이라고 함
클라이언트에게 받은 json 문자열을 서버단이 읽을 수 있는 js 객체로 바꾸는 것을 말함

```

const jsonStr = '{"a":1,"b":2}';
console.log(JSON.parse(jsonStr)); // { a: 1, b: 2 }

```

## 변환

### array -> set

Set은 중복 요소를 허용하지 않는 데이터 구조

```

const arr = [1, 2, 3, 3, 4];
const set = new Set(arr); // 중복을 제거한 Set 객체 생성
console.log(set); // Set { 1, 2, 3, 4 }

```

### set -> array

중복 요소를 허용하는 구조

```

const set = new Set([1, 2, 3, 3, 4]);
const arr = [...set]; // 스프레드 연산자를 사용해 배열로 변환
console.log(arr); // [1, 2, 3, 4]

```

```

const arr = Array.from(set);
console.log(arr); // [1, 2, 3, 4]

```

### object, dict -> array

```

const obj = { a: 1, b: 2, c: 3 };
const keys = Object.keys(obj); // ['a', 'b', 'c']
const values = Object.values(obj); // [1, 2, 3]
const entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

```

### array, set -> object

배열을 객체로 변환할 때, 배열의 요소를 키-값 쌍으로 변환해야함
배열의 각 요소가 [key, value]의 형태일 경우 Object.fromEntries()를 사용하여 객체로 변환할 수 있음
\*Set ↔ Object: 직접 변환은 불가하며, 배열로 변환 후 처리

```

const arr = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(arr);
console.log(obj); // { a: 1, b: 2, c: 3 }

const set = new Set([['a', 1], ['b', 2]]);
const obj = Object.fromEntries(set);
console.log(obj); // { a: 1, b: 2 }

```

### object -> set

```

const obj = { a: 1, b: 2, c: 3 };
const set = new Set(Object.entries(obj));
console.log(set); // Set { ['a', 1], ['b', 2], ['c', 3] }

```

### 배열 안 요소 타입 변환

map() 메서드를 사용하여 각 요소에 parseInt() 또는 Number()를 적용

```

const arr = ["1", "2", "3", "4"];
const intArr = arr.map(Number); // 각 요소를 숫자로 변환
console.log(intArr); // [1, 2, 3, 4]

const intArr2 = arr.map(val => parseInt(val, 10)); // 10진수로 변환
console.log(intArr2); // [1, 2, 3, 4]

```

### string -> array

```

const str = "hello";
const arr = str.split('');
console.log(arr); // ['h', 'e', 'l', 'l', 'o']

```

### array -> string

```

const arr = ['h', 'e', 'l', 'l', 'o'];
const str = arr.join('');
console.log(str); // 'hello'

```

### string -> int

```

const str = "123";
const num = Number(str); // 123 (정수)
const int = parseInt(str, 10); // 123 (정수)
const decimal = parseFloat("123.45"); // 123.45 (실수)

```

### int -> string

String() 함수 또는 toString() 메서드를 사용하여 숫자를 문자열로 변환
decimal은 integer(number type) 혹은 string으로 관리할 수 있음
string으로 관리하는 경우 수 계산을 위함이며 bignumberjs로 계산을 처리한다

```

const num = 123;
const str = String(num); // '123'
console.log(str); // "123"

const decimal = 123.45;
const decimalStr = decimal.toString(); // '123.45'
console.log(decimalStr); // "123.45"

```

### concat()

배열이나 문자열을 병합할 때 사용

```

// 문자열
const str1 = "Hello";
const str2 = "World";
console.log(str1.concat(" ", str2)); // "Hello World"

// 배열
const arr1 = [1, 2];
const arr2 = [3, 4];
console.log(arr1.concat(arr2)); // [1, 2, 3, 4]

```

### Object.assign()

하나 이상의 객체를 대상으로 객체 병합(얕은 복사)
객체의 속성 중에 중첩된 객체가 있으면 그 중첩된 객체는 복사되지 않고 참조가 복사되어 문제가 발생할 수 있음

```

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { d: 3 };

const result = Object.assign({}, obj1, obj2);
console.log(result); // { a: 1, b: { c: 2 }, d: 3 }

// 얕은 복사이므로 result.b는 obj1.b와 동일한 참조
result.b.c = 4;
console.log(result); // { a: 1, b: { c: 4 }, d: 3 }
console.log(obj1); // { a: 1, b: { c: 4 } } (obj1의 b도 변경됨)

```

## 채우기

### fill()

배열 요소를 채워서 Init() 함

```

const arr = [1, 2, 3];
console.log(arr.fill(0)); // [0, 0, 0]

```

### padStart()

앞에 특정 문자열 채움

```

const str = "5";
console.log(str.padStart(3, "0")); // "005"

```

### padEnd()

끝에 특정 문자열 채움

```

const str = "5";
console.log(str.padEnd(3, "0")); // "500"

```

### copyWithin()

일부 요소 복사해서 입력한 인덱스 범위에 넣음
새 배열 안만듦

```

const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // 첫 번째부터 시작해서 3번째 요소를 복사
console.log(arr); // [4, 5, 3, 4, 5]

```

### findIndex()

조건에 맞는 첫번째 인덱스를 반환

```

const arr = [1, 2, 3, 2, 1];
console.log(arr.findIndex(x => x === 2)); // 1 (첫 번째 2의 인덱스)

```

### findLastIndex()

배열에서 제공된 함수의 조건에 해당하는 마지막 요소의 인덱스를 반환

```

const arr = [1, 2, 3, 2, 1];
console.log(arr.findLastIndex(x => x === 2)); // 3

```

### find()

배열에서 조건에 맞는 첫번째 요소를 리턴함

```

const arr = [1, 2, 3, 4, 5];
const found = arr.find(x => x % 2 === 0); // 짝수를 찾음
console.log(found); // 2 (첫 번째 짝수)

```

### findLast()

제공된 함수의 조건을 만족하는 마지막 요소를 반환

```

const arr = [1, 2, 3, 4, 5];
const found = arr.findLast(x => x % 2 === 0); // 짝수를 찾음
console.log(found); // 4

```

## 값 타입 확인

### isNaN()

값이 NaN 인지 확인.
하지만 숫자가 아닌 모든 값들을 NaN으로 판단할 수 있다.

```

console.log(isNaN("hello")); // true -> 그냥 NaN 인지 확인
console.log(Number.isNaN("hello")); // false -> 숫자인지 확인

```

### Array.isArray()

배열인지 확인

```

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("hello")); // false

```

## 반올림

### Math.floor(), Math.ceil(), Math.round()

```

console.log(Math.floor(4.7)); // 4 (버림)
console.log(Math.ceil(4.3)); // 5 (올림)
console.log(Math.round(4.5)); // 5 (반올림)

```

### Object.freeze()

객체를 불변 상태로 만들어서 해당 객체의 속성을 수정, 추가, 삭제할 수 없게 만듦

```

const obj = { a: 1, b: 2 };
Object.freeze(obj);
obj.a = 3; // 수정되지 않음
console.log(obj.a); // 1

```

### Object.seal()

객체를 기존 속성을 변경할 수 있지만, 새로운 속성을 추가하거나 삭제할 수 없는 상태로 만듦

```

const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // 변경 가능
delete obj.a; // 삭제 불가
console.log(obj); // { a: 2 }

```

### Array.from()

유사 배열 객체나 이터러블 객체를 배열로 변환시킴

```

const str = "hello";
const arr = Array.from(str);
console.log(arr); // ['h', 'e', 'l', 'l', 'o']

```

### Stack 관련 메서드

스택은 후입선출(LIFO, Last In First Out) 구조

```

push(element): 스택의 맨 위에 새 요소를 추가.
pop(): 스택의 맨 위에 있는 요소를 제거하고 반환.
peek() / top(): 스택의 맨 위에 있는 요소를 반환하되, 제거하지 않음.
isEmpty(): 스택이 비어 있는지 확인.
length / size(): 스택의 크기를 반환.

const stack = [];
stack.push(5); // 스택에 값 추가
stack.pop(); // 스택에서 값 제거

```

### Queue 관련 메서드

큐는 선입선출(FIFO, First In First Out) 구조

```

enqueue(element) / push(element): 큐의 뒤에 새 요소 추가.
dequeue() / shift(): 큐의 앞에서 요소를 제거하고 반환.
front() / peek(): 큐의 앞에 있는 요소를 반환하되, 제거하지 않음.
isEmpty(): 큐가 비어 있는지 확인.
length / size(): 큐의 크기를 반환.

const queue = [];
queue.push(5); // 큐에 값 추가
queue.shift(); // 큐에서 값 제거

```

### Sequence 수열 관련 메서드

순차적인 데이터를 다루는 것을 수열이라고 한다.

```

push(element): 배열에 새 요소를 추가.
splice(start, deleteCount, ...items): 배열의 특정 위치에서 요소를 삭제하고 새 요소를 삽입.
slice(start, end): 배열의 일부를 복사하여 새 배열을 반환.
reduce(callback, initialValue): 배열의 모든 요소를 순차적으로 누적하여 결과를 계산.
map(callback): 배열의 각 요소를 변환하여 새 배열을 반환.
filter(callback): 특정 조건을 만족하는 요소들만 모아 새 배열을 반환.
find(callback): 특정 조건을 만족하는 첫 번째 요소를 반환.

const arr = [1, 2, 3, 4];
const result = arr.reduce((acc, val) => acc + val, 0); // 배열의 합 구하기

```

### 다이나믹 프로그래밍

초기화, 점화식, 메모이제이션, 탑다운/바텀업 방식 많이 사용
메서드는 위에 정리한 것들을 이용

---

```

```
