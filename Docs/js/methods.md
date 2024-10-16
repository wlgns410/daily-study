# js 메서드들

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

### split

특정 구분자를 기준으로 문자열을 나누어 배열로 반환

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
stack.pop();   // 스택에서 값 제거
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
queue.push(5);    // 큐에 값 추가
queue.shift();    // 큐에서 값 제거
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

추가적으로 작업 필요
