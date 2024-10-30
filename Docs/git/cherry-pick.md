# git cherry-pick

특정 커밋을 다른 브런치에 가져오는 것을 말한다.  
이 커밋만을 다른 브런치에서 가져다가 쓰고 싶을 때 사용한다.

```
git switch <target-branch>

git log

git cherry-pick <commit-hash> //적용할 커밋의 해시를 이용해 git cherry-pick 명령어를 실행
```

## 예제

```
git switch main
git log

git switch feature/branch
git cherry-pick <commit-hash>
```

main에 있는 특정 커밋의 해시를 보고 feature/branch 브런치로 가져올 수 있다.

## 충돌시

```
git add .
git cherry-pick --continue
```

충돌이 생기면 Git이 알려주며, 파일을 수정하고 충돌을 해결한 후 아래 명령을 실행하여 cherry-pick을 완료한다.

```
git cherry-pick --abort
```

충돌을 포기하고 cherry-pick을 취소할 수도 있다.

## 여러 커밋 체리 픽

```
git cherry-pick <start-commit>^..<end-commit> // git cherry-pick A^..B 처럼 ^.. 로 작성해야함

git cherry-pick <commit-hash1> <commit-hash2> <commit-hash3>
```

해시 범위를 지정할 수 있고 공백으로 나열해서 선택할 수도 있다.
