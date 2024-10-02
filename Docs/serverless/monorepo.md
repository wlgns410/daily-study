# monorepo 설정

```
{
  "name": "serverless",
  "version": "1.0.0",
  "description": "serverless project",
  "private": true,
  "workspaces": {
    "packages": [
      "layers/common",
      "layers/concert",
      "layers/reservation",
    ],
    "nohoist": [
      "**/layer-common",
      "**/layer-common/**",
      "**/layer-concert",
      "**/layer-concert/**",
      "**/layer-reservation",
      "**/layer-reservation/**",

    ]
```

1. "private": true

프로젝트 패키지가 npm에 배포되지 않도록 한다.  
이 프로젝트는 public이 아니라는 뜻이며, 주로 모듈들을 묶어 사용하는 Monorepo에서 루트 패키지에 사용된다.  
그리고 각 layer마다 package.json이 존재한다.

2. "workspaces": { "packages": [] }

이 옵션은 Yarn Workspaces나 npm Workspaces와 함께 사용되며, 여러 패키지를 한 프로젝트에서 관리할 수 있게 해준다.  
Monorepo를 설정할 때 사용하며 packages 배열 안에 각각의 서브 프로젝트 경로를 정의하는 용도이다.  
따라서 packages 폴도 안에 있는 각 layer가 워크스페이스의 일부로 간주되어진다.

3. "nohoist": []

**nohoist**는 Yarn Workspaces에서 사용하는 옵션으로, 특정 패키지를 루트에서 호이스팅하지 않고 해당 워크스페이스 폴더에서 직접 설치하게 한다.  
기본적으로 Yarn Workspaces는 의존성을 루트 디렉토리로 호이스팅하여 설치 속도를 개선하지만, 특정 패키지가 워크스페이스에서 별도로 설치되어야 할 경우 루트 디렉토리로 사용하면 안되고  
각 디렉토리를 개별적으로 관리할 때 이 옵션을 사용한다.

4. references

```
//tsconfig.json

"references": [
    {
      "path": "layers/common"
    },
    {
      "path": "layers/concert"
    },
    {
      "path": "layers/reservation"
    }
  ]
```

Monorepo에서 여러 패키지 간의 공유 코드를 다루기 위해 TypeScript를 사용할 수 있으며, 이 경우 tsconfig.json에서 references 옵션을 사용해 패키지 간의 의존성을 정의할 수 있다.

5. serverless 패키지

```
"serverless": "^3.32.2",
"serverless-offline": "^12.0.4",
"serverless-plugin-typescript": "2.1.1",
```

lerna나 serverless를 이용해 배포를 할 수 있는데, yml에 작성하는 것은 다음에 설명하고자 한다.
