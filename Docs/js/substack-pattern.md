# substack 패턴

각 서비스 또는 모듈을 독립적으로 관리하면서 필요에 따라 재사용 가능한 공통 모듈을 만드는 형태로 구현하는 것을 substack 패턴이라고 한다.

## 독립된 모듈 구성

```
src/
  ├── app.module.ts
  ├── user/
  │   ├── user.module.ts
  │   ├── user.controller.ts
  │   └── user.service.ts
  ├── product/
  │   ├── product.module.ts
  │   ├── product.controller.ts
  │   └── product.service.ts
  ├── common/
      ├── common.module.ts
      └── logger.service.ts
      ...
```

보통 nodejs 프로젝트는 서비스 혹은 레이어 기준으로 모듈을 분리시킨다.  
위 예시는 서비스 기준으로 간단한 구조로 모듈화 한 것이다.

클린 아키텍처 기반의 레이어 모듈화도 substack 패턴의 일종으로 볼 수 있다고 한다.  
클린 아키텍처는 애플리케이션의 비즈니스 로직, 데이터 액세스 로직, 인터페이스 등을 레이어별로 분리하고, 그 레이어들이 독립적으로 관리될 수 있게 구성되기 때문에 각 레이어가 독립된 스택을 형성하기 때문이다.

## 결론

substack 패턴은 프로젝트의 독립성을 극대화하면서, 공통 모듈을 여러 서비스에서 재사용할 수 있게 하는 구조를 말한다.  
시스템의 확장성과 유연성을 확보하면서 각 서비스가 독립적으로 유지하고 하나의 서비스에 변화를 주더라도 다른 서비스에 영향을 주지 않도록 설계하는 것을 목표로 한다.
