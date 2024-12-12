# github action workflow 최적화

팀에서 배포하다가 pro 계정의 3000분 배포시간을 초과하는 일이 발생했다.  
일단은 무제한 모드를 사용해 해결했지만, 최적의 해결방안은 아니기 때문에 workflow 최적화 계획을 세워보도록 하자.

## npm 캐싱사용

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

```

GitHub Actions에서 빌드, 테스트, 의존성 설치 등 반복적인 작업을 줄이기 위해 캐싱을 활용한다.

- 속도 향상: 프로젝트의 의존성을 매번 새로 설치하면 시간이 오래 걸립니다. 캐싱을 통해 의존성 설치 시간을 줄일 수 있습니다.
- 비용 절감: GitHub Actions 실행 시간은 유료 플랜에서 비용이 발생합니다. 패키지 설치 실행 시간을 줄이면 비용도 줄일 수 있습니다.

### 작동 방식

1. actions/cache@v3 액션을 사용하여 ~/.npm 디렉토리(로컬 npm 캐시 저장소)를 캐싱합니다.
2. key 값은 캐시를 구분하는 고유한 키로 설정됩니다. 여기서는 OS와 package-lock.json 파일의 해시값을 사용하여 캐시를 구분하고 있습니다.
   hashFiles('\*\*/package-lock.json'): package-lock.json 파일의 변경 여부를 기준으로 캐시를 새로 만듭니다.
3. restore-keys: 캐시가 정확히 일치하지 않을 때, 비슷한 키를 가진 캐시를 복원합니다.

```
1. 워크플로 실행 시, 의존성 설치 전에 actions/cache를 통해 ~/.npm 디렉토리에 저장된 캐시가 있으면 복원합니다.
2. 복원된 캐시가 있으면 npm ci가 의존성을 다시 다운로드하지 않고, 기존 캐시를 활용합니다.
3. npm ci는 캐시와 로컬 의존성을 비교하여 변경된 부분만 업데이트합니다.
캐시 업데이트
4. package-lock.json이 변경된 경우, 새로운 캐시가 생성되고 변경되지 않았다면 이전에 저장된 캐시를 재사용합니다.
```

## 매트릭스 전략 최적화

```
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14, 16] # 모든 버전 대신 주력 지원 버전만 선택
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

프로젝트에서 반드시 지원해야 하는 Node.js 버전만 테스트한다.  
예를 들어, 최신 LTS 버전(14, 16)을 선택하고 구식 버전이나 실험적 버전(예: 18)을 생략하여 테스트 시간을 줄일 수 있게 된다.

## 단계 병렬화

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Build project
        run: npm run build

  test:
    runs-on: ubuntu-latest
    needs: build # build 완료 후 실행
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Run tests
        run: npm test

```

위처럼 병렬적으로 실행할 수 있는 작업을 나눠 실행한다.  
하지만, 주입받아야하는 것이 있는 경우 위처럼 병렬적으로 실행하는 것이 어려울 수 있다.

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build application
        run: npm run build
  unit-tests:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Run unit tests
        run: npm test -- --unit
  integration-tests:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Run integration tests
        run: npm test -- --integration

```

위처럼 유닛테스트, 빌드, 통합테스트를 동시에 병렬적으로 실행해 시간을 단축시킬 수 있다.

## 출력 최소화

```
steps:
  - name: Run tests with minimal output
    run: npm test --silent

```

위처럼 출력 로그가 너무 많아도 workflow 실행 속도가 느려질 수 있으니 출력을 최소한으로 해서 실행 시간을 조금이라도 단축시킬 수 있다.
