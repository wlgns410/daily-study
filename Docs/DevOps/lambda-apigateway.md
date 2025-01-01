# Lambda + API Gateway

Lambda는 비즈니스 로직만 처리하며, API Gateway가 HTTP 엔드포인트 역할을 수행한다.  
따라서 API Gateway는 요청을 받아 Lambda로 전달하고, Lambda의 응답을 클라이언트에 반환한다.

## 언제 Lambda만 사용할까?

단순한 스케줄러 역할만 필요하다면 Lambda만으로 충분하다.  
또는 내부 호출용으로도 사용할만 하다.

## Lambda + API Gateway로 REST API

REST API를 제공하려면 Lambda에 HTTP 요청을 연결할 수 있는 API Gateway가 필요하다.

1. API Gateway 생성

- REST API 또는 HTTP API를 선택

2. Lambda 통합

- API Gateway의 특정 경로(예: /users, /items)를 Lambda 함수와 연결

  3.HTTPS 및 인증 설정

- 기본적으로 HTTPS가 활성화되며, 추가적으로 인증(JWT, API Key 등)을 설정 가능

## 비교

![이미지](/asset/lambda.png)
