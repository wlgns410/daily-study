# pm2 watch mode

PM2는 프로덕션 환경에서 널리 쓰이는 Node.js 프로세스 관리 도구를 말한다.  
PM2는 Node.js 애플리케이션을 관리하는 프로세스 관리자로 사용한다.  
특히, 무중단 서비스 운영과 프로덕션 환경 관리에 최적화된 도구로, 애플리케이션 실행, 로깅, 오류 복구, 클러스터링 등을 지원한다.

## Hot Reload 지원

watch 모드를 활성화하면 파일 변경 사항을 감지하여 서버를 다시 시작한다.

```
npm install -g pm2
pm2 start app.js --watch
```

변경 사항을 반영하기 위해 수동으로 서버를 재시작할 필요 없으며, 개발과 디버깅 속도 향상에 많은 도움을 준다.

## ecosystem.config.js 설정

```
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./app.js",
      watch: true, // Watch mode 활성화
      ignore_watch: ["node_modules", "logs"], // 감시 제외 경로
      watch_options: {
        followSymlinks: false, // 심볼릭 링크는 무시
        usePolling: true,      // 파일 변경 감지를 폴링으로 수행 (성능 보완)
      },
    },
  ],
};

```

위처럼 세부사항도 설정할 수 있다.

---

그 외 여러 기능이 있지만, 이번에는 watch mode만 설명했다.
