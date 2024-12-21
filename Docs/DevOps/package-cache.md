# package cache

GitHub Actions에서 actions/cache를 활용하여 npm을 사용할 수도 있다.  
기본적으로 actions/cache는 **node_modules**와 같은 디렉터리를 캐싱하며, npm에서도 동일한 방식으로 적용할 수 있다.

## 예시

```
name: CI

on:
  push:
    branches:
      - main

jobs:
  install_dependencies:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Restore cache
      uses: actions/cache@v4
      with:
        path: node_modules
        key: ${{ runner.os }}-nestjs-${{ hashFiles('**/package.json', '**/package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
        restore-keys: |
          ${{ runner.os }}-nestjs-${{ hashFiles('**/package.json', '**/package-lock.json') }}-

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

```

- 키 결과 : `ubuntu-latest-nestjs-<hash-of-package-files>-<hash-of-source-files>`
- key : 캐시 키는 package.json과 package-lock.json을 기반으로 생성되며, package.json과 package-lock.json이 변경되면 캐시가 새로 생성된다.
- restore-keys : restore-keys는 캐시 복원 시에 사용하는 백업 키입니다. package.json과 package-lock.json이 동일하다면 해당 키를 통해 캐시를 빠르게 찾을 수 있게된다.

### 방식

- 캐시 복원: actions/cache는 package.json과 package-lock.json 파일의 해시를 기반으로 캐시를 복원하는데, 의존성 설치가 필요 없으면 캐시된 node_modules를 재사용한다.
- 의존성 설치: npm install을 실행하여 새로운 의존성을 설치하는데, 캐시가 사용되므로 이 단계가 매우 빨라진다.
- 테스트 실행: 테스트 실행 단계에서 이전 캐시가 활용되어 테스트가 빠르게 실행된다.

### 주의

- 패키지 업데이트 시 캐시 무효화: package-lock.json이 변경되면 새로운 캐시가 생성되며, package가 자주 업데이트된다면, 캐싱효과를 거의 얻지 못할것임
- 캐시 크기: node_modules는 종속성이 많을 경우 크기가 매우 커질 수 있어서 캐시 크기를 주의 깊게 관리해야 한다. 참고로 GitHub Actions는 기본적으로 5GB까지 캐시를 지원한다.
- 5GB 초과시 : 5GB를 초과하면 캐시 저장이 실패하며, 캐시없이 배포가 진행되거나, 캐시 자체로 과금되지는 않지만, Actions 실행 시간과 스토리지 사용량이 과금에 영향을 줄 수 있게 된다.(pro 3000분 제한 있음)
