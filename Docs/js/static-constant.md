# 정적 상수와 객체 생성

```
UnitSeq: {
    type: DataTypes.INTEGER,
    type: new DataTypes.INTEGER,

```

위처럼 Sequelize에서 DataTypes.INTEGER는 내부적으로 미리 정의된 숫자 타입이므로 `정적 상수`이다.

```
UnitSeq: {
  type: DataTypes.INTEGER
}
```

따라서 위처럼 사용하는 것이 맞다.  
미리 정의된 정적 상수를 참조하는 방식으로 동작한다.  
내부적으로 DataTypes.INTEGER는 이미 생성된 타입을 사용하므로 new를 붙일 필요가 없기 때문이다.

`new DataTypes.INTEGER`는 잘못된 사용 방식이지만, 대부분의 경우 에러가 발생하지 않고 무시된다.  
이 방식은 `DataTypes.INTEGER`가 생성자 함수가 아닌 상수이므로 불필요한 객체 생성 시도이며 이렇게 작성하는 것을 피해야한다.

```
class MyClass {
  constructor() {
    this.name = 'example';
  }
}

const instance = new MyClass();
```

위처럼 새로운 인스턴스를 만들 때나 new 생성자 함수를 사용하도록 하자.
