# Yarn Workspaces

Yarn Workspaces는 모노레포(Monorepo)를 관리하기 위한 Yarn의 내장 기능을 말한다.

## 주요 특징

1. **의존성 공유**: 여러 프로젝트에서 공통으로 사용되는 의존성을 루트 디렉토리에서 한 번만 설치
2. **링크된 의존성**: 워크스페이스 간의 심볼릭 링크를 자동으로 생성
3. **일관된 버전 관리**: 모든 패키지에서 동일한 버전의 의존성 사용 보장
4. **동시 스크립트 실행**: 여러 패키지의 스크립트를 한 번에 실행 가능

## 설정 방법

1. 루트 `package.json`에 workspaces 설정 추가:

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

2. 각 패키지의 `package.json`에 고유한 이름 지정:

```json
{
  "name": "@your-org/package-name",
  "version": "1.0.0"
}
```

## 주요 명령어

- `yarn workspace <workspace-name> <command>`: 특정 워크스페이스에서 명령 실행
- `yarn workspaces run <command>`: 모든 워크스페이스에서 명령 실행
- `yarn workspaces info`: 워크스페이스 의존성 그래프 확인

## 장점

1. **개발 효율성**: 코드 재사용과 공유가 용이
2. **의존성 관리**: 중복 설치 방지로 디스크 공간 절약
3. **일관성**: 패키지 간 버전 충돌 방지
4. **변경 추적**: 관련 패키지들의 변경사항을 한눈에 파악 가능

## 주의사항

1. private 속성을 true로 설정해야 함
2. 각 패키지는 고유한 이름을 가져야 함
3. 순환 의존성을 피해야 함
4. 패키지 간 버전 관리에 주의

## 유용한 팁과 모범 사례

### 1. 버전 관리 전략

- 패키지 버전은 semver 규칙을 따르기
- changesets 도구를 사용하여 버전 관리 자동화
- 패키지 간 의존성 버전은 명확한 범위 지정 (예: ^1.0.0)

#### 1-1 Semver (Semantic Versioning)

Semver는 소프트웨어 버전 번호를 관리하는 규칙이다.
`MAJOR.MINOR.PATCH` 형식을 사용한다 (예: 1.2.3)

- MAJOR: 호환되지 않는 API 변경 (1.0.0 -> 2.0.0)
- MINOR: 이전 버전과 호환되는 기능 추가 (1.0.0 -> 1.1.0)
- PATCH: 이전 버전과 호환되는 버그 수정 (1.0.0 -> 1.0.1)

#### 1-2 Changesets

Semver는 버전 번호 체계를 제공하고, Changesets는 이 버전 관리를 자동화하는 도구이다.

```bash
# 설치
yarn add -D @changesets/cli

# 초기화
yarn changeset init
```

```bash
# 변경사항 기록
yarn changeset

```

이후 대화형 프롬프트가 실행됨:

# 1. 어떤 패키지가 변경되었는지 선택

# 2. 변경 타입 선택 (major/minor/patch)

# 3. 변경사항에 대한 설명 작성

Changesets는 특히 여러 패키지를 관리하는 모노레포에서 버전 관리의 복잡성을 크게 줄여주는 도구이므로 유용하게 사용할 수 있다.

### 2. 문제 해결 팁

- 의존성 충돌 시 `yarn why` 명령어로 원인 파악
- 캐시 문제 발생 시 `yarn cache clean` 실행
- node_modules 삭제 후 `yarn install` 로 초기화

### 3. CI/CD 최적화

- 캐시 활용으로 설치 시간 단축
- 변경된 패키지만 빌드하도록 설정
- 병렬 실행으로 빌드 시간 최적화
