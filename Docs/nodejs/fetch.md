# fetch, axios

기본적으로 fetch가 내장되어 있어서 이를 사용한다.

```
const url = 'https://api.example.com/endpoint';
const data = { name: 'test'};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token'
    },
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(data => console.log('Response data:', data))
    .catch(error => console.error('Error:', error));
```

```
const axios = require('axios');

const url = 'https://api.example.com/endpoint';
const data = { name: 'test' };

axios.post(url, data, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token'
    }
})
    .then(response => console.log('Response data:', response.data))
    .catch(error => console.error('Error:', error));
```

axios는 timeout 등 많은 기능을 제공하지만 설치해야한다.  
테스트 용으로 바로 쏴볼 예정이라면 fetch를 사용해보자.

```
// fetch 예시
fetch('https://api.example.com/endpoint', {
    method: 'POST',
    body: JSON.stringify({ name: 'John Doe' })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

```

## 전송 방법

```
const url = 'https://api.example.com/endpoint';
const data = { name: 'test'};

axios.post(url, data)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```

axios에서는 data를 객체로 전달해도 자동으로 JSON 문자열로 변환된다.  
이때 Content-Type이 application/json으로 자동 설정되어 JSON 데이터로 처리된다.  
따라서 axios에서는 JSON.stringify를 따로 해주지 않아도 된다고 한다.

```
axios.post('https://api.example.com/endpoint', { name: 'test' });

// 이렇게 보내는것도 body에 보내는거고

fetch('https://api.example.com/endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'test' })
});

// 이렇게 보내는 것도 body에 보내는것인데, 명시를 해주는 것임
```
