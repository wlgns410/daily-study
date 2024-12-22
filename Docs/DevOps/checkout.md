# actions/checkout@v4 란

github actions workflow를 보다보면 필수적으로 actions/checkout@v4라는 코드를 볼 수 있다.  
해당 코드는 저장소 코드를 가저오는데 사용하는 action으로 github에서 공식적으로 제공한다.

## 기능

- 로컬 환경에서 Git 명령어를 실행한 것처럼, 지정된 커밋, 브랜치, 태그 등을 체크아웃(다운로드)할 때 사용한다.
- 현재 브랜치의 최신 커밋을 기본적으로 체크아웃
- 특정 브랜치, 태그, 커밋을 명시적으로 지정 가능

```
steps:
- name: Checkout specific branch
  uses: actions/checkout@v4
  with:
    ref: develop // main, release과 같이 브런치를 특정할 수 있음
```

위처럼 특정 브런치를 체크아웃할 수도 있다.

```
steps:
- name: Checkout with submodules
  uses: actions/checkout@v4
  with:
    submodules: true
```

위처럼 서브모듈(각 저장소를 별도로 관리하는 기능으로 Git 저장소 안에 또 다른 Git 저장소를 포함하는 구조를 말한다)을 가져오게 할 수도 있다.

```
with:
  fetch-depth: 0
```

기본값은 1로 최근 1개의 커밋만 가져오게 하거나, 0으로하면 모든 커밋 히스토리를 가져오게 하거나 할 수 있다.

```
with:
  token: ${{ secrets.MY_GITHUB_TOKEN }}
```

깃헙의 비공개 저장소에 접근할 때 사용하는 인증토큰을 넣어 비공개 저장소에서 어떤 작업을 할 수 있게 해준다.

```
with:
  path: jihoon-repo
```

디렉토리 저장소 경로를 설정할 수 있고, 기본값은 `./`이다.

```
with:
  clean: true
```

기본값 true로 작업 디렉토리를 초기화한다. false면 작업을 유지한채로 하므로 충돌일 날 수도 있다.

```
with:
  fetch-tags: true
```

git tag를 가져올 수 있으며, 태그로 버저닝 관리한다면 이를 사용할 수 있게된다.

```
with:
  persist-credentials: true
```

인증정보를 후속 작업에서 사용할 수 있게 된다. 기본값 true이다.
