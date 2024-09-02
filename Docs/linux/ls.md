# ls 명령어

1. `--color` 명령어
2.

```
// 파일 유형에 따라 다른 색상으로 파일을 표시
$ ls --color
$ ls --color=auto: 터미널이 색상을 지원하는 경우에만 색상을 적용. 가장 일반적으로 사용됨
$ ls --color=always: 모든 경우에 색상을 적용
$ ls --color=never: 색상을 사용 x

// 커스텀 설정
export LS_COLORS="di=1;34:ln=1;36:so=1;35:pi=40;33"
```

본인이 원하는 색상 설정도 가능함

2. `ls -l` 상세 목록 보기

```
$ ls -l

-rw-r--r--  1 user group   4096 Aug 28 12:34 file.txt
drwxr-xr-x  2 user group   4096 Aug 28 12:35 directory
```

3. `ls -a` 숨긴 파일 보기

```
$ ls -a

.vscode .bashrc .env
```

4. `ls -R` 재귀적으로 디렉토리 표시

```
$ ls -R

ls -R
isArrayLikeObject.js
isBoolean.js
isBuffer.js
isDate.js
isElement.js
isEmpty.js
isEqual.js
isEqualWith.js
isError.js
isFinite.js
isFunction.js
isInteger.js
isLength.js
isMap.js
isMatch.js
isMatchWith.js
isNaN.js
isNative.js
isNil.js
isNull.js
isNumber.js
isObject.js
...
```

5. `ls -h` 파일 크기 읽게 쉽게 표시(보통 폰트 크기보다 커짐)

```
$ ls -lh

```

6. `ls -t` 수정 시간 순으로 정렬

```
$ ls -lt

-rw-r--r--  1 user group   4096 Aug 28 12:35 newfile.txt
-rw-r--r--  1 user group   4096 Aug 28 12:34 file.txt
```

7. `ls -S` 파일 크기 순 정렬

```
$ ls -ls

-rw-r--r--  1 user group   1048576 Aug 28 12:34 largefile.bin
-rw-r--r--  1 user group   4096 Aug 28 12:35 smallfile.txt
```

8. `ls -r` 역순으로 정렬

-t, -s, -l 과 함께 사용

```
$ ls -lr

drwxr-xr-x  2 user group   4096 Aug 28 12:35 directory
-rw-r--r--  1 user group   4096 Aug 28 12:34 file.txt
```

9. `ls -d` 디렉토리 자체만 표시

```
$ ls -d */

directory/
```

10. `ls --group-directories-first` 디렉토리를 파일을 먼저 표시

```
$ ls --group-directories-first

directory/  file.txt  newfile.txt
```

11. `ls -i` 파일의 inode 번호를 같이 표시

이는 파일 시스템에서 파일을 고유하게 식별하는데 사용함

```
$ ls -i

12345678 file.txt  12345679 directory/
```

---

참고

[ls 옵션](https://www.atatus.com/blog/ls-command-in-linux-with-example/)
