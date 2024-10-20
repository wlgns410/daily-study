# .gitkeep과 .gitignore

## .gitkeep:

.gitkeep은 사실 Git에서 공식적으로 제공하는 파일은 아니며, 그저 빈 디렉토리를 Git에 포함시키기 위한 관습적인 파일 이름이다.

```
project/
├── logs/
│   └──      # 여기 파일이 없을 때 logs 디렉토리를 git은 추적하지 않음

.gitkeep
```

```
# .gitkeep 파일

/logs
```

목적: Git은 기본적으로 빈 디렉토리를 트래킹하지 않기 때문에, 빈 디렉토리를 Git에 포함시키고 싶을 때 .gitkeep 파일을 디렉토리에 넣어 이를 트래킹하도록 한다.

## .gitignore

```
# .gitignore

# 로그 파일 무시
logs/

# 빌드 폴더 무시
dist/

# 환경 설정 파일 무시
.env

```

목적: 특정 파일이나 디렉토리를 버전 관리하지 않도록 하기 위해 사용됩니다. 개발 중 생성되는 로그 파일, 빌드 파일, 또는 개인 설정 파일과 같이 버전 관리에서 제외하고 싶은 파일들을 .gitignore 파일에 명시한다.

이 둘은 반대 역할을 수행한다고 볼 수 있다.  
.gitkeep은 추가할 것을 지정하고, .gitignore는 제외할 것을 지정하여 사용한다.
