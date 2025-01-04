# 의존성 설치로 인한 cpu 사용량 급증 막기

컨테이너 실행 시 npm install, pip install, composer install 등과 같은 의존성 설치 작업이 이루어진다면, 이 과정이 CPU를 많이 소모할 수 있다.  
따라서 Dockerfile에서 의존성 설치 작업이 빌드 단계에서 완료시켜야 한다.

## 방법

### 1. zero install

전에 설명한 것이 있어서 [참고](./yarn-zero-install.md)

### 2. Docker Layer Caching

```
COPY package.json package-lock.json ./

RUN npm install
```

package.json과 package-lock.json 파일만 먼저 복사하고, RUN npm install 명령어를 실행하면, 의존성이 변경되지 않는 한 캐시를 재사용하는 방법이다.

```
RUN apk add py3-pip make gcc g++
RUN apk update
RUN apk add --no-cache bash

ADD https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for  /
RUN chmod +x /wait-for
ADD https://raw.githubusercontent.com/derekmahar/docker-compose-wait-for-file/master/ubuntu-wait-for-file/wait-for-file.sh  /
RUN chmod +x /wait-for-file.sh
```

이렇게 되어있는 도커 파일이 있다면,

```
# 필요한 패키지 설치 및 파일 추가
RUN apk add --no-cache py3-pip make gcc g++ bash && \
    wget -O /wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for && \
    chmod +x /wait-for && \
    wget -O /wait-for-file.sh https://raw.githubusercontent.com/derekmahar/docker-compose-wait-for-file/master/ubuntu-wait-for-file/wait-for-file.sh && \
    chmod +x /wait-for-file.sh
```

1. 여러 RUN 명령어를 하나로 결합하여 불필요한 레이어 생성을 줄이기
2. apk update는 일반적으로 apk add에 포함되므로 불필요한 레이어이므로 제거
3. URL로 다운로드한 스크립트(ADD)는 변경될 가능성이 낮으므로 빌드 초기 단계에서 처리하면 캐시가 잘 유지되서 정적 파일과 명령어 분리시켜서 캐싱 유지시킴
4. 변경 가능성이 높은 명령어는 뒤로 배치

이렇게 레이어 수를 줄이고 캐시 재사용 가능성을 높여 cpu 소모 급증을 막을 수 있다.

### 3. Multi-stage Build

이는 개발 환경과 운영 환경 분리시킨다는 개념으로 패키지의 설치 수를 줄이는 전략을 말함

### 4. github package caching action

전에 설명한 것이 있어서 [참고](./package-cache.md)
