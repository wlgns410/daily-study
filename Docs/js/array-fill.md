# 다차열 배열 0으로 채우기

다차원 배열을 0으로 채우는 방법은 각 차원에 대해 Array.from이나 Array의 fill 메서드를 중첩하여 원하는 크기만큼 0으로 채우는 방식으로 구현한다.

1. 1차원 배열 (길이가 n인 배열)

```
const oneDimensionalArray = Array(n).fill(0);
```

2. 2차원 배열 (n x n 크기의 배열)

```
const twoDimensionalArray = Array.from({ length: n }, () => Array(n).fill(0));
```

length를 사용해 배열의 크기를 미리 설정할 수 있음

3. 3차원 배열 (n x n x n 크기의 배열)

```
const threeDimensionalArray = Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
        Array(n).fill(0)
    )
);
```

4. array(n).fill(array(n).fill(0)) 안쓰는 이유

```
const twoDimensionalArray = Array(3).fill(Array(3).fill(0));
twoDimensionalArray[0][0] = 1;
console.log(twoDimensionalArray);
// Output: [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
```

Array(n).fill(Array(n).fill(0))와 같이 .fill만 사용할 경우, 내부 배열은 `같은 참조`를 가리켜서 값을 수정할 때 모든 행에 영향을 미치게 됨.  
그래서 Array.from을 사용하면 각 요소에 대해 새로운 배열을 생성하므로 독립적인 배열들이 생성해야함

```
**Array.fill**은 단순히 지정된 값으로 배열을 채움
**Array.from**은 유사 배열 객체나 이터러블을 배열로 변환하면서, length와 콜백을 사용해 초기화함
```

5. Array.from

```
const squares = Array.from({ length: 5 }, (_, i) => i * i);
console.log(squares); // [0, 1, 4, 9, 16]
```

Array.from의 두 번째 인수로 각 요소를 초기화할 콜백 함수를 지정할 수 있음

```
const str = 'hello';
const arr = Array.from(str);
console.log(arr); // ['h', 'e', 'l', 'l', 'o']
```

Array.from은 유사 배열 객체 또는 이터러블 객체를 배열로 변환하는 데 사용할 수도 있음

```
const mySet = new Set([1, 2, 3]);
const arr = Array.from(mySet);
console.log(arr); // [1, 2, 3]
```

Array.from은 Set 또는 Map과 같은 이터러블 객체를 배열로 쉽게 변환할 수도 있음
