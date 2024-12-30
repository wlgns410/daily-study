# serverless framework

서버리스 프레임워크란 ec2가 아니라 Lambda같은 서버리스에 배포하기 위한 프레임워크를 말한다.  
물론 github action을 쓴다면 serverless 프레임워크 없이도 배포가 가능하긴 하다.

## 장점

- 자동화된 ZIP 파일 생성: 코드를 ZIP으로 패키징하고 필요한 의존성까지 포함하여 자동으로 업로드
- YAML 파일로 간단히 정의: serverless.yml에서 Lambda 함수, 트리거, 리소스(API Gateway, DynamoDB 등)를 한 번에 정의할 수 있음
- 배포 과정 단순화: serverless deploy 한 줄 명령으로 모든 작업을 처리
- 로컬 개발 및 테스트 지원: serverless invoke local 명령으로 로컬에서 함수를 테스트할 수 있음
- 환경 변수 관리: .env 파일이나 YAML에서 환경 변수를 간단히 관리
- AWS 리소스와 통합: Lambda 외에도 API Gateway, DynamoDB, S3 등 AWS 리소스를 쉽게 정의하고 연결 가능

## github action을 이용한 배포와 차이

1. github action은 Lambda에 배포할 코드를 직접 ZIP 파일로 만들어야 하지만, serverless framework는 그렇지 않는다.
2. 배포 설정에 대한 모든 단계를 직접 설정해야 하기 때문에 처음 하게 되면 복잡할 수 있음
3. Secret으로 환경변수 관리가 가능하지만, Serverless Framework처럼 환경 변수 관리는 상대적으로 불편할 수 있음

![서버리스프레임워크](/asset/serverless-framework.png)

## 결론

lambda 중심으로 배포를 한다면 serverless framework를 이용해서 빠르게 배포하는 것이 편해보이므로 적극 활용해보자.
