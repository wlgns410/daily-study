# source-map-support

source-map-support는 컴파일된 JavaScript 코드의 에러를 원래 TypeScript 코드의 정확한 위치로 매핑해주기 때문에, 디버깅을 크게 도와준다.  
이를 통해 에러의 원인을 빠르게 파악하고 수정할 수 있게 된다.

```
// BEFORE
at Object.<anonymous> (dist/services/user.service.js:35:10)

AFTER
at Object.<anonymous> (src/services/user.service.ts:20:5)
```

## 역할

TypeScript 컴파일러(tsc)는 컴파일 시 소스맵 파일(.map)을 생성한다.  
이 파일은 원본 TypeScript 코드와 컴파일된 JavaScript 코드 간의 매핑 정보를 포함하고 있다.  
source-map-support는 런타임에서 이러한 소스맵을 사용하여 에러 스택 트레이스를 원본 TypeScript 코드의 위치로 매핑한다.  
즉, 에러가 발생했을 때 스택 트레이스에 표시되는 경로를 dist 폴더 내의 JavaScript 파일 경로가 아니라, 실제 작성한 TypeScript 파일의 위치로 보여주기 때문에 디버깅이 쉬워진다.

원본 코드의 위치를 정확하게 알 수 있어 디버깅이 훨씬 쉬워진다.

## 만약 dist 폴더 자체에 문제가 있을 경우

패키지 설치 오류나 dist 파일 자체의 문제일 경우에는 source-map-support가 소스 맵을 이용해 에러를 TypeScript 코드로 매핑해 주더라도, 실제 에러는 dist 파일에서 발생하므로 dist 경로를 스택 트레이스에 보여준다.  
한마디로 매핑이 안되니 dist 경로를 그대로 보여준다는 것이다.
