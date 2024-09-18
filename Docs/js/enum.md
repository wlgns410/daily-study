# enum

**Java의 enum**과 **JS 의 enum**의 핵심적인 차이는 바로 객체처럼 사용할 수 있는지, 아니면 단순한 상수 집합처럼 사용해야 하는지 차이가 있다.

## js의 enum

**JS의 enum**은 단순히 값의 상수 집합을 정의하는 용도로 사용된다.
각 열거형 값은 단순히 정수나 문자열 값에 대응하며, 그 자체로 속성이나 메서드를 가질 수 없게 된다.  
즉, Java의 enum처럼 각 상수를 객체처럼 다루는 것은 불가능하게 된다.

```
enum OrderStatus {
    PENDING = "Pending",
    SHIPPED = "Shipped",
    DELIVERED = "Delivered"
}

// 사용 예시
const status: OrderStatus = OrderStatus.PENDING;
console.log(status); // 출력: "Pending"
```

위처럼 단순히 상수값으로써 존재하며, Java처럼 속성이나 메서드를 가질 수 없다.

## ts-enum-util 패키지

**ts-enum-util**과 같은 패키지를 사용하더라도 TypeScript의 enum을 완전히 Java의 enum처럼 객체로 다룰 수 있는 것은 아니다.  
다만, ts-enum-util과 같은 라이브러리는 TypeScript의 enum을 다루기 위한 여러 가지 유틸리티를 제공하며 값 순회, 값 검증, 값 변환 등의 기능을 사용할 수 있게 된다.

- 편의성 제공: ts-enum-util은 TypeScript의 enum을 다루기 위해 편의 기능을 제공하지만, 그 자체로 Java의 enum처럼 기능을 확장하는 것은 아니다
- 타입 검증과 순회: enum에 정의된 값들을 다루고, 특정 값이 enum에 포함되는지 검증하는 등의 반복적인 작업을 간편하게 만들어 주는 것이 목적이다.

```
import { Enum } from 'ts-enum-util';

enum OrderStatus {
  PENDING = "Pending",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
}

// 1. 모든 enum 값을 배열로 가져오기
const values = Enum.values(OrderStatus);
console.log(values); // ["Pending", "Shipped", "Delivered"]

// 2. 특정 값이 enum에 있는지 확인하기
const isValid = Enum.isType(OrderStatus, "Shipped");
console.log(isValid); // true

// 3. enum 값 매핑
const descriptions = Enum.map(OrderStatus, status => `Status: ${status}`);
console.log(descriptions); // ["Status: Pending", "Status: Shipped", "Status: Delivered"]
```

위처럼 enum을 다루기 위한 여러 기능을 사용할 수 있다.

## ts-enum-util 단점

- 객체처럼 사용 불가: ts-enum-util을 사용해도 enum 자체에 메서드나 속성을 추가할 수 없다. 즉, `OrderStatus.PENDING.getDescription()` 같은 객체 지향적인 사용은 불가능하다.
- 추가 로직 포함 불가: enum 내부에 복잡한 비즈니스 로직이나 생성자 등을 추가할 수 없다. Java의 enum처럼 완전한 객체를 만들지 못한다.

## 객체 지향적으로 사용하기

만약 Java의 enum처럼 **객체 지향적인 enum**이 필요한 경우, JS에서는 보통 클래스나 객체를 활용하여 비슷한 구조를 만들어 사용하게 된다.

```
class OrderStatus {
  static PENDING = new OrderStatus('Pending');
  static SHIPPED = new OrderStatus('Shipped');
  static DELIVERED = new OrderStatus('Delivered');

  private constructor(public readonly displayName: string) {}

  getDescription() {
    return `Status: ${this.displayName}`;
  }
}

// 사용 예시
const status = OrderStatus.PENDING;
console.log(status.getDescription()); // "Status: Pending"
```

사실 이렇게 되면 enum 키워드를 사용하지 않는 것이므로, 이 방식은 enum의 장점인 직관적 선언과 간단한 사용을 잃게 된다.

## enum과 class 방식 비교

```
**JS의 enum**
- 상수의 집합을 정의하는 용도로 사용.
- 각 값은 정수 또는 문자열로만 표현 가능.
- 속성이나 메서드를 가질 수 없음.

**클래스 기반 enum**
- class를 활용해 객체처럼 열거형 상수를 정의.
- 각 열거형 값에 속성이나 메서드를 추가할 수 있음.
- 실제로는 enum이 아닌 클래스를 사용한 대체 패턴.
```
