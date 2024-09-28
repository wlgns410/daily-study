# 객체와 배열유사객체

## array-like (배열 유사 객체)

배열처럼 보이지만, 진짜 배열이 아닌 객체이다.  
배열처럼 length 속성과 인덱스를 기반으로 한 값을 가지지만, Array.prototype의 메서드(forEach, map, filter 등)를 사용할 수 없다.  
length 속성이 존재하며, 인덱스를 통해 값에 접근할 수 있다.  
배열로 변환할 수 있다.

```
const arrayLike = {
  0: 'a',
  1: 'b',
  length: 2
};

console.log(arrayLike[0]); // 'a'
console.log(arrayLike.length); // 2
// arrayLike.map(item => item) // TypeError: arrayLike.map is not a function

const realArray = Array.from(arrayLike);
realArray.map(item => console.log(item)); // 'a', 'b'
```

## like(일반 객체)

일반 객체로, 배열처럼 length 속성과 인덱스 값이 없으며, 배열처럼 사용되지 않는다.  
객체 리터럴로 정의된 모든 일반 객체가 이에 해당한다.  
배열처럼 length 속성이 존재하지 않으며, 값에 접근하기 위해서는 인덱스가 아니라 key를 사용한다.  
배열 메서드를 사용할 수 없으며, 객체 메서드(Object.keys(), Object.values() 등)를 사용해야 한다.

```
onst likeObject = {
  a: 'apple',
  b: 'banana'
};

console.log(likeObject.a); // 'apple'
console.log(likeObject.length); // undefined
// likeObject.map(item => item) // TypeError: likeObject.map is not a function
```

## 차이점

1. 배열 유사 객체는 length가 있으므로 for 루프에서 사용할 수 있지만, 일반 객체는 length가 없으므로 for 루프에서 오류가 발생할 수 있다.

```
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // 'a', 'b'
}

const likeObject = { a: 'apple', b: 'banana' };
for (let i = 0; i < likeObject.length; i++) {
  console.log(likeObject[i]); // TypeError: Cannot read property 'length' of undefined
}


```

2. 배열 유사 객체에 배열 메서드를 사용하면 TypeError가 발생한다. 배열로 변환해야 배열 메서드를 쓸 수 있다.

```
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
arrayLike.map(item => console.log(item)); // TypeError: arrayLike.map is not a function

```
