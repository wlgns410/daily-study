# Continuation Passing Style

프로그래밍에서 연산을 명시적으로 전달하는 스타일을 말한다.  
함수가 결과를 반환하는 대신에 다음에 해야할 작업을 다른 함수에 전달하는 방식으로 코드를 작성하는 것을 말한다.  
CPS는 비동기 처리나 재귀적 함수 호출의 최적화에서 사용되며, 함수가 자신의 호출을 끝낸 뒤 할 일을 미리 명시된 다른 함수에게 넘겨주는 방식으로 동작한다.

```
function add(a,b,continues){
    continues(a+b)
}

add(2,3(result)=>{
    console.log(result) // 5
})
```

위처럼 간단하게 함수는 결과를 바로 반환하지 않고, 다음에 할 일을 함수 인수로 넘겨받아 처리하게 할 수 있다.

```
const fs = require('fs')

fs.readFile('file.txt', 'utf8', (err, data)=>{
    if(err) throw err;
    console.log(data)
})
```

위처럼 비동기적으로 파일을 읽은 후에 그 결과를 콜백 함수에 넘겨서 처리하게 할 수 있다.  
이런방식을 CPS라고 한다.

---

참고

nodejs 디자인 패턴 바이블
