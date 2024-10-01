# keyof와 map

## keyof

TypeScript에서 객체 타입의 키(key)를 추출하는 키워드이다.  
이를 통해 객체 타입의 모든 키의 이름을 하나의 유니언 타입으로 가져올 수 있다.

Map 타입에 대해 keyof를 사용할 경우, Map의 내부 메소드나 프로퍼티를 나타내는 키들이 반환된다.  
하지만, 일반적으로 keyof는 객체 리터럴 타입에서 키의 타입을 추출할 때 자주 사용된다.

```
interface User {
  id: number;
  name: string;
  age: number;
}

type UserKeys = keyof User; // "id" | "name" | "age"
```

위처럼 keyof는 유저 인터페이스의 모든 키를 유니언 타입으로 추출한다.

## keyof와 Map 객체

TypeScript에서 keyof를 사용하여 Map의 키를 추출하려고 하면, Map 자체의 메소드나 프로퍼티의 이름이 반환된다.

```
const myMap = new Map<string, number>();

type MapKeys = keyof typeof myMap; // "set" | "get" | "has" | "delete" | ...
```

keyof로 map 객체 자체의 메소드 키도 유니언타입으로 얻을 수 있다.

## 객체 타입에서 keyof

보통 이 둘을 혼용하여 객체 타입에서 동적으로 키를 가져와 제네릭한 형태의 타입을 만들때 사용한다.

```
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alice', age: 25 };

const userId = getProperty(user, 'id'); // number
const userName = getProperty(user, 'name'); // string

```

객체의 키에 해당하는 값의 타입을 유연하게 처리할 수 있게 된다.  
위처럼 객체의 키(K)는 keyof T로 추출되므로 T 객체 타입의 모든 키가 될 수 있다.  
즉, K는 T 객체의 키들 중 하나이며 키는 일반적으로 문자열(string)로 표현되지만, 숫자형 키도 가능하게 된다는 뜻이다.  
T[K]는 키에 해당하는 값의 타입이 무엇이든지 유연하게 처리할 수 있게 된다.

## Map과 keyof를 조합해서 키 타입을 추출

```
interface User {
  id: number;
  name: string;
  age: number;
}

// User 객체의 키 타입만을 추출
type UserKeys = keyof User;  // 'id' | 'name' | 'age'

// Map을 사용해 User 객체의 키를 관리할 수 있다.
const userMap: Map<UserKeys, string | number> = new Map();

userMap.set('id', 1);
userMap.set('name', 'Alice');
userMap.set('age', 25);

// 'id' 키로 값을 가져오면, 값은 number 타입
const id = userMap.get('id'); // number
console.log(id); // 1

// 'name' 키로 값을 가져오면, 값은 string 타입
const name = userMap.get('name'); // string
console.log(name); // 'Alice'

```

`Map<UserKeys, string | number>`는 UserKeys를 키로, string | number를 값으로 하는 Map을 정의한다.

## Map과 제네릭을 함께 사용

```
function createUserMap<T>(user: T): Map<keyof T, T[keyof T]> {
  const map = new Map<keyof T, T[keyof T]>();

  for (const key in user) {
    map.set(key as keyof T, user[key]);
  }

  return map;
}

const user = {
  id: 1,
  name: 'John',
  age: 30,
};

const userMap = createUserMap(user);

console.log(userMap.get('id'));    // 1
console.log(userMap.get('name'));  // 'John'
console.log(userMap.get('age'));   // 30

```

`createUserMap<T>(user: T): Map<keyof T, T[keyof T]>`는 제네릭 T를 사용해 객체 T의 키와 그에 해당하는 값의 타입을 동적으로 Map에 저장한다
`keyof T`는 객체의 키들(id, name, age)을 추출하고, `T[keyof T]`는 해당 키들의 값을 추출한다.

## 결론

keyof를 이용하면 객체의 키 타입을 추출해 유니언 타입으로 사용할 수 있다.
이를 Map의 키 타입으로 사용해 객체의 값을 관리하게 할 수 있다.
