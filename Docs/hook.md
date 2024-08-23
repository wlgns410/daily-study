# hook

훅(Hooks)을 사용하는 이유는 코드의 재사용성과 유지보수성을 높이고, 특정 로직을 액션이나 메서드의 실행 전후에 쉽게 추가할 수 있게 한다.  
주로 코드의 구조를 깔끔하게 유지하면서, 공통적으로 필요한 작업을 중앙 집중화하거나 분리된 방식으로 코드를 작성할 수 있다.

```
module.exports = {
    name: "users",
    actions: {
        createUser(ctx) {
            const user = this.createUser(ctx.params);

            // 로그 기록 (여러 액션에서 중복 발생 가능)
            this.logUserAction("User created", user);

            return user;
        }
    }
};
```

위 같은 코드가 있다고 생각해보자.  
로그 기록하는 메서드를 각 액션마다 중복적으로 넣어줘야할 것이다.

```
module.exports = {
    ...
    name: "users",
    actions: {
        createUser(ctx) {
            const user = this.createUser(ctx.params);
            return user;
        }
    },
    hooks: {
        after: {
            createUser(ctx, res) {
                // 모든 사용자 생성 후 자동으로 로그 기록
                this.logUserAction("User created", res);
            }
        }
    }
    ...
};
```

hooks라는 메서드로 훅을 쉽게 사용할 수 있다.  
애플리케이션 로직과 데이터 처리 로직을 깔끔하게 분리하고, 코드의 가독성과 유지보수성을 높일 수 있게 되었다.  
event-driven arhitecture인 `moleculerjs`에서는 좀 더 직관적으로 hook을 사용할 수 있다는 장점이 있다.

훅을 사용하는 코드에서는 메서드나 액션의 실행 전후에 추가적인 로직이 실행된다.  
훅을 제대로 이해하지 못하고 코드를 봤어서, 해당 로직이 어디서, 언제, 왜 실행되는지 파악하기가 어려웠었고 훅에 대해 새롭게 알게 되었다.

---

### 참고

[moleculer.js hooks](https://moleculer.services/docs/0.13/actions.html)
