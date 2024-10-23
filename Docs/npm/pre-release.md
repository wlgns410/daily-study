# pre-release

npm은 프리릴리즈(Pre-release) 버전 배포를 지원한다.  
이는 라이브러리나 패키지를 개발 중에 테스트할 때, 다른 팀원이 알 수 있도록 하기 위함이며 이는 npm install할 때 보통 최신 latest를 가져가는데, 이 pre-release 버전은 안가져가므로 협업에 용이하다.

```
npm version preminor
```

위처럼 하면 `v1.0.0 → v1.1.0-0` 가 만들어진다.

npm publish로 배포하면, latest 패키지가 v1.1.0-0 버전이 되어 문제가 발생한다.

```
npm version prerelease —preid=alpha
npm publish —tag alpha

npm version v2.0.11-alpha.0 // 이렇게 직접 버전을 지정할 수도 있다.
npm publish —tag alpha
```

위처럼 alpha 같은 tag를 붙여 명시적으로 하도록 한다.

```
npm install v2.1.0-alpha.0
```

위처럼 명시적으로 설치하지 않는 이상 테스트 패키지를 다른 팀원이 설치할 일이 없어져 테스트가 용이해진다.

```
// 버전 업이 필요한 경우
npm version v2.0.11-alpha.1 // npm version v2.0.11 버전에서 alpha를 개발용으로 사용한다고 가정
npm publish —tag alpha
```

위처럼 직접 지정해서 버전을 올려도 된다.

```
npm version fetch // npm version v2.0.12 위처럼 버전을 올리고
npm publish
```

작업이 다 끝나면 fetch로 버전을 올리면 fetch versioning을 한 것으로 업로드 된다.
