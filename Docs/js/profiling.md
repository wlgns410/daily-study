# 실행시간 분석

## 실행시간 측정

Node.js에서 console.time과 console.timeEnd를 사용해 특정 코드 블록의 실행 시간을 측정하는 것이 젤 쉽긴하다.

```
console.time('Execution Time');
// 측정하려는 코드 블록
for (let i = 0; i < 100000; i++) {
  Math.sqrt(i);
}
console.timeEnd('Execution Time');

Execution Time: 25ms
```

## 고급 프로파일링

performance.now()를 사용하면 더 정확한 시간 측정을 할 수 있다.

```
const { performance } = require('perf_hooks');

const start = performance.now();
// 측정하려는 코드
for (let i = 0; i < 1e6; i++) {
  Math.sqrt(i);
}
const end = performance.now();

console.log(`Execution time: ${end - start}ms`);

```

## Node.js 디버깅 툴

```
node --inspect-brk your-script.js
```

프로파일 생성

```
node --prof your-script.js

```

cpu 프로파일 저장

```
node --prof-process isolate-*.log > processed.txt

```

프로파일 분석이 가능하다.

## 실시간 디버깅 도구

크롬 개발자 도구(Network 탭)

- 클라이언트와 서버 간 통신 속도를 분석.
- 요청이 서버에서 오래 걸리는 경우, 서버 코드를 점검.

## clinic js

Node.js 성능을 시각화하고 병목을 찾는 데 도움.

### Clinic.js 구성 요소

Clinic.js는 3가지 주요 도구를 제공한다.  
각각의 역할은 다음과 같다.

1. Clinic Doctor

애플리케이션의 전체적인 성능 상태를 빠르게 진단.
애플리케이션 실행 중 병목이나 지연 원인을 한눈에 파악.

2. Clinic Flame

플레임 그래프를 사용해 CPU 사용량을 시각화.
함수 호출 스택을 분석하여 CPU 사용량이 높은 구간을 찾아냄.

3. Clinic Bubbleprof

애플리케이션의 비동기 동작을 시각적으로 분석.
이벤트 루프의 흐름과 비동기 작업 간의 상호작용을 이해.

이런 것이 있으니 사용해봐야겠다.
