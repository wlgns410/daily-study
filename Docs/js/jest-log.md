# jest 디버깅을 위한 설정 추가

## jest에서 필터링된 로그 사용

```
// jest.config.js
module.exports = {
  verbose: false,  // 각 테스트의 자세한 실행 결과를 최소화
  silent: true,  // 모든 console.log, console.error 등 숨기기
};
```

위처럼 사용하면 편하긴 하지만 예상치 못한 에러 로그까지 숨겨 디버깅을 어렵게 만든다.

## jest.spyOn으로 특정 로그 무시

```
beforeAll(() => {
  // 여러개 배열로 담아서 한 파일에 있는 예상된 성공 에러를 보지 않을 수 있음
  const ignoredErrors = ['Invalid number', 'Expected error', 'Another expected error'];

  jest.spyOn(global.console, 'error').mockImplementation((msg) => {
    if (ignoredErrors.some((error) => msg.includes(error))) {
      return;  // 예상된 에러 메시지일 때 로그를 무시
    }
    console.log(msg);  // 예상되지 않은 에러 메시지만 출력
  });
});

afterAll(() => {
  console.error.mockRestore();  // 테스트 후 원래 동작 복구
});

```

여러 예상된 에러를 처리: 에러 메시지가 많아질 경우 배열로 관리하면 훨씬 더 깔끔하고 유지보수하기 쉬워진다.

## 디버깅 설정 추가

```
 diagnostics: {
        warnOnly: false,  // true로 설정하면 경고만 출력 (에러는 무시)
        pretty: true,     // 더 읽기 쉬운 포맷으로 출력
      }
```

warnOnly: true로 설정하면 오류가 아닌 경고만 출력됩니다. 디버깅 중에 모든 오류를 보고 싶다면 false로 설정  
pretty: 출력 포맷을 더 읽기 쉽게 설정

## 디버그 모드로 Jest를 실행

```
{
  "scripts": {
    "test:debug": "node --inspect-brk ./node_modules/.bin/jest
  }
}

$ npm run test:debug
```

--inspect-brk 는 jest에서 디버깅을 가능하게 해주므로 조금 더 에러를 찾기 쉽게 만들어줍니다.
따라서 위처럼 cli 명령어로 만들어서 에러를 만났을 때 사용할 수 있도록 만들어두면 디버깅이 더 쉬워집니다.
