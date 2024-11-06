# 디버거

```
//moleculer 디버깅
{
	// Use IntelliSense to learn about possible Node.js debug attributes.
	// Hover to view descriptions of existing attributes.
	// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Debug",
            "envFile": "${workspaceRoot}/.env",  // .env 파일 설정 추가
            "timeout": 60000,
			"program": "${workspaceRoot}/node_modules/moleculer/bin/moleculer-runner.js",
			"sourceMaps": true,
			"runtimeArgs": [
				"-r",
				"ts-node/register"
			],
			"cwd": "${workspaceRoot}",
			"args": [
				"services/**/*.service.ts"
			]
		},
		{
			"type": "node",
			"request": "launch",
			"name": "Jest",
			"program": "${workspaceRoot}/node_modules/jest-cli/bin/jest.js",
			"args": [
				"--runInBand"
			],
			"cwd": "${workspaceRoot}",
			"runtimeArgs": [
				"--nolazy"
			],
            "envFile": "${workspaceRoot}/.env.test"  // .env.test 파일 설정 추가
		}
	]
}
```

이렇게 하면 env 환경설정을 가져와서 테스트 서버를 가지고 디버깅을 돌릴 수 있다.  
또한 계속 디버거 서버를 틀어놓는 것도 서버를 돌리는 것이니 타입아웃이 날 수 있는데, 타임아웃 설정도 할 수 있다.

```
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "NestJS Debug",
			"envFile": "${workspaceRoot}/.env",  // .env 파일 설정 추가
			"timeout": 60000,  // 타임아웃 설정
			"program": "${workspaceRoot}/src/main.ts",  // NestJS 시작 파일 설정
			"sourceMaps": true,
			"runtimeArgs": [
				"-r",
				"ts-node/register"
			],
			"cwd": "${workspaceRoot}",
			"args": []
		},
		{
			"type": "node",
			"request": "launch",
			"name": "Jest",
			"program": "${workspaceRoot}/node_modules/jest-cli/bin/jest.js",
			"args": [
				"--runInBand"
			],
			"cwd": "${workspaceRoot}",
			"runtimeArgs": [
				"--nolazy"
			],
			"envFile": "${workspaceRoot}/.env.test"  // .env.test 파일 설정 추가
		}
	]
}

```

nestjs는 위처럼 main.ts로 설정하면 된다.
