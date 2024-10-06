# switch 와 checkout

git switch와 git checkout은 모두 브랜치를 변경하거나 새로운 브랜치를 생성하는 데 사용된다.  
하지만 목적이 조금 다르다.

## git switch

브런치 전환과 생성에만 사용된다.

```
// 전환
git switch develop
```

```
// 생성
git switch -c feature/test
```

## git checkout

git checkout은 많은 역할을 한다.  
브런치 전환, 생성, 특정 커밋으로 전환, 파일이나 디렉토리의 상태를 이전 커밋이나 다른 브런치로 복구 그리고 원격 브런치를 로컬에 가져오기

```
git checkout dev

git checkout -b feature/test2

git checkout HEAD^ -- file.txt

git checkout feature/remote // 원격 브런치가 있을경우 로컬에 해당 브런치 + 코드를 가져옴
```

## git restore

작업 디렉토리나 스테이징 영역에서 변경사항을 되돌리기 위한 명령어이며, 나는 vscode에서 제공하는 소스 제어를 이용하다보니 잘 사용하진 않았다.

```
// 작업 디렉토리에서 변경사항 되돌리기 -> 이전 커밋 상태로 내가 코드 작성하기 전으로 되돌림
git restore test.ts

// 스테이징에 있는 파일 되돌리기
git restore --staged test2.ts
```

## git stash

작업 디렉토리와 스테이징 영역에 있는 변경 사항을 임시로 저장하고 작업 디렉토리를 깔끔하게 만들어서 git pull, merge등을 하기 위함이다.  
단, git stash는 스테이징 상태로 만드는게 아니라 현재 변경 사항을 임시로 숨겨두는 것으로 스테이징 영역에 저장된 상태가 아닌 현재 디렉토리에 적용된다.  
따라서 스테이징 된 상태는 유지되지 않으므로 다시 스테이징하려면 git add든, 소스 제어에서 직접 추가하던 해야한다.

### git stash apply

stash에 저장된 변경사항을 작업 디렉토리에 반영하고, stash 목록에 남겨둠

### git stash pop

stash에 저장된 변경사항을 작업 디렉토리에 반영하고, stash 목록에서 제거함
