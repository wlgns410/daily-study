# jest 성능분석

## 테스트 성능분석

테스트가 너무 오래 걸리거나, 특정 비동기 작업이 끝나지 않는 문제가 생길 수 있다.

```
jest --detectOpenHandles
```

해당 옵션을 사용하여 비정상적인 소켓 통신이나 코드 문제를 찾을 수 있다.

## 테스트 타임아웃

부하 테스트 시 특정 시간 내에 실행되는 것을 보고 싶을 수 있는데, 이때 사용할 수 있다.  
또는 비동기 테스트가 너무 오래걸리면 테스트 무한 대기 상태에 빠지므로 이를 실패하게 해 테스트를 끝내게 하기 위한 목적도 있다.

```
// 전역적으로 타임아웃 설정
jest.setTimeout(10000);

// 개별 테스트에서 타임아웃 설정
test('비동기 작업 테스트', async () => {
  // 테스트 내용
}, 10000);  // 이 테스트의 타임아웃을 10초로 설정
```