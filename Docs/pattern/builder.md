# 빌더 패턴

빌더 패턴은 복잡한 객체 생성 과정을 단계별로 나누어 처리할 수 있도록 도와주는 설계 패턴이다.  
객체를 생성하는 과정에서 필요한 설정을 쉽게 추가하거나 변경할 수 있게 만들어 주고, 마지막에 build() 메서드를 호출해 완성된 객체를 반환하는 방식으로 동작하게 된다.

```
class Pizza {
  constructor(
    public dough: string,
    public sauce: string,
    public topping?: string
  ) {}
}

class PizzaBuilder {
  private dough: string;
  private sauce: string;
  private topping?: string;

  setDough(dough: string): this {
    this.dough = dough;
    return this;
  }

  setSauce(sauce: string): this {
    this.sauce = sauce;
    return this;
  }

  setTopping(topping: string): this {
    this.topping = topping;
    return this;
  }

  build(): Pizza {
    return new Pizza(this.dough, this.sauce, this.topping);
  }
}

// 사용 예시
const myPizza = new PizzaBuilder()
  .setDough('Thin Crust')
  .setSauce('Tomato')
  .setTopping('Pepperoni')
  .build();

console.log(myPizza); // 출력: Pizza { dough: 'Thin Crust', sauce: 'Tomato', topping: 'Pepperoni' }

```

위 피자 만드는 빌더를 만든다고 생각해보자.  
각 메서드로 순서대로 피자 만드는 작업을 수행하도록 하고 마지막에 build하여 원하는 객체 구조로 리턴되게 한다.

## 사용 이유

빌더 패턴은 복잡한 객체를 단계별로 구성하는 방법이다.  
객체 생성에 필요한 단계적인 작업을 순차적으로 수행하고, 마지막에 객체를 반환하는 모양이다.

사용 목적: 복잡한 객체의 생성을 단순화하고, 일관성 있게 객체를 생성하는 것에 중점을 가짐
주요 개념: 객체 생성을 위한 단계를 명확하게 정의하고, 그 과정을 순차적으로 처리함

## 코드상에서 사용하는 예시

```
const paginationResponse = new PaginationBuilder()
  .setData(data)
  .setPage(pagination.page)
  .setTake(pagination.take)
  .setTotalCount(count)
  .build();

```

보통 페이징에서 빌더 패턴을 많이 사용하곤 한다.
