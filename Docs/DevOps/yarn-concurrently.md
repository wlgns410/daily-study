# yarn concurrently 옵션

concurrently는 로컬 환경 또는 CI/CD 파이프라인에서 서로 의존하지 않는 작업을 동시에 실행할 수 있는 옵션이다.

## 사용 예시

빌드와 테스트 작업은 서로 의존할 수도 있지만, 상관관계가 없을 수도 있다.
테스트 후 빌드를 하거나 빌드하고 테스트를 하거나 의존을 가질 수도 있지만 의존이 없는 구조라고 생각해보자.

```
yarn add concurrently --dev
```

```
"scripts": {
  "build": "concurrently \"yarn install && yarn build\" \"yarn dc:test\""
}
```

패키지 설치와 빌드를 한번에 묶고 테스트 코드는 도커로 돌리므로 병렬적으로 돌아가게 만들 수도 있다.  
물론 이는 로컬에서 실행하는 방법이며 remote에는 조금 다를 수 있다.

```
"scripts": {
  "build": "concurrently -n \"INSTALL_AND_BUILD,TEST\" \"yarn install && yarn build\" \"yarn test\""
}
```

이처럼 출력 로그를 남겨 작업을 명확히 남기는 것도 좋은 방법이다.

```
[INSTALL_AND_BUILD] Installing dependencies...
[INSTALL_AND_BUILD] Building the project...
[TEST] Running tests...
```

그럼 위처럼 출력이 될 것이다.
