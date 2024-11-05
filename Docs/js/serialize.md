# 시리얼라이징 & 디시리얼라이징

```
const data = { name: "Alice", age: 25 }; // JSON 객체

// fetch를 사용할 때 JSON 문자열로 변환
fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data) // JSON 객체를 문자열로 변환하여 body에 포함
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

api를 호출할때 body안에 데이터를 담아서 보낸다.  
근데 문자열 형태로 된 JSON 데이터로 보내야한다.

이는 JSON 문자열: "{ \"key\": \"value\" }"와 같은 형태로, 데이터를 문자로 표현한 것이다. 문자열일 뿐이기 때문에 JavaScript 객체와 달리 속성에 접근할 수 없다.

## 시리얼라이징

```
const jsonObj = { name: "Alice", age: 25 };
const jsonString = JSON.stringify(jsonObj);
// 결과: '{"name":"Alice","age":25}'
```

자바스크립트 객체를 JSON 문자열로 변경하는 것이다.

## 디시리얼라이징

```
const jsonString = '{"name":"Alice","age":25}';
const jsonObj = JSON.parse(jsonString);
// 결과: { name: "Alice", age: 25 }
```

문자열을 객체로 변환하는 과정이다.  
JSON 문자열을 JSON.parse()를 사용해 JavaScript 객체로 변환해서 읽을 수 있는 객체 형태를 말한다.

## 결론

서버와 클라이언트 간의 데이터 전송은 주로 텍스트 기반의 형식이 필요하기 때문에, JSON 문자열로 변환하여 전송하게 된다.  
텍스트 기반 데이터 형식(예: JSON)은 바이너리로 인코딩하여 전송할 수 있어 네트워크와 시스템 간에 효율적이고 안정적으로 교환이 가능하기 때문이다.  
그 바이너리로 인코딩한 데이터를 패킷으로 보내게 되는데, 이런 이유로 json 문자열로 보낸다.
