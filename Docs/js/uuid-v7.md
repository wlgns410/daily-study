# postgresql과 uuidv4 그리고 uuidv7

- PostgreSQL에서 UUID 전용 데이터 타입을 사용하는 것이 효율적입니다.

## 이점

1. 메모리 효율성
   UUID 타입은 16바이트의 고정된 크기를 사용하며, 추가 메타데이터가 없습니다.  
   반면, TEXT/STRING 타입은 UUID 값을 문자열로 저장하므로 길이 정보를 포함하는 메타데이터가 추가되며, 결과적으로 1~4바이트의 추가 오버헤드가 발생합니다.

2. 검색 및 정렬 성능 향상
   UUID 데이터 타입은 저장 공간이 작기 때문에 인덱스 생성 및 검색 속도가 상대적으로 빠릅니다.  
   반면 텍스트 타입으로 저장된 UUID는 문자열 비교를 수행하므로 더 많은 리소스를 소비합니다.

3. 데이터 무결성
   PostgreSQL의 UUID 타입은 값이 UUID 형식인지 검증합니다.  
   반면 텍스트 타입을 사용하면 비정상적인 형식의 값이 저장될 가능성이 있습니다.

4. 호환성
   UUID 타입은 PostgreSQL의 기본 데이터 타입으로, 내장 함수 및 기능과 잘 호환됩니다.

- uuid_generate_v4() 함수를 사용해 UUID 값을 생성할 수 있습니다.
- 클라이언트에서 UUID를 다룰 때 추가 변환이 필요하지 않습니다.

5. 저장 및 관리
   UUID를 TEXT로 저장하면 대략 36바이트가 필요하며, 이는 UUID 타입에 비해 약 2배 이상의 저장 공간을 소모합니다. 이를 이용한 저장 공간 최적화는 대규모 데이터베이스에서 유용하게 쓰입니다.

## uuid v4와 psql 인덱스의 단점

UUID는 완벽한 선택지로 보이지만, 이것도 단점은 있다.  
uuid v4와 B-tree 인덱스의 문제점이 바로 그것이다.

### 단점들

1. 랜덤 값 특성

UUID v4는 완전한 무작위(random) 값으로 생성됩니다.  
따라서 새로운 값이 추가될 때마다 B-tree는 무작위로 분산된 값을 정렬해야 하므로 인덱스의 재정렬 비용이 높아집니다.

2. 인덱스 페이지 스플릿

B-tree는 정렬된 상태를 유지해야 하므로 새로운 랜덤 값이 중간에 삽입될 경우, 기존의 인덱스 페이지가 나뉘거나 재구성됩니다.  
이는 성능 저하와 더불어 디스크 I/O 증가를 초래합니다.

3. 스케일 문제

데이터가 많아질수록 인덱스 관리 비용이 증가하므로, 대규모 테이블에서는 UUID v4가 비효율적입니다.

## 해결방법

UUID v7은 시간 기반(순차적) UUID로, UUID v4의 무작위성과는 달리 시간의 흐름에 따라 증가하는 값을 생성합니다.

### uuid v7의 장점

1. 순차적 생성

시간 스탬프를 기반으로 값이 생성되므로 값의 정렬이 자연스럽게 이루어집니다.  
이로 인해 B-tree 인덱스는 새로운 값을 삽입하더라도 추가적인 재정렬 작업을 줄일 수 있습니다.

2. 삽입 성능 향상

UUID v7은 자연스러운 정렬을 지원하므로 B-tree의 페이지 스플릿 빈도를 크게 줄입니다.  
결과적으로 삽입 성능과 디스크 I/O 효율이 개선됩니다.

3. 호환성 유지

UUID v7은 기존 UUID 형식(128비트)을 유지하므로, 데이터베이스와 애플리케이션의 기존 구조를 크게 변경하지 않고도 도입할 수 있습니다.

## 예시

### nodejs에서 사용

1. 패키지 설치

```
npm install @uuidjs/uuidv7
```

2. js/ts 사용

```
const { v7 } = require('@uuidjs/uuidv7');

const uuid: string = v7();
console.log(uuid); // 시간 기반 UUID v7 출력
```

### psql에서 사용

1. 패키지 설치

```
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

위 명령어는 PostgreSQL 데이터베이스에 pgcrypto 확장을 추가하며, gen_random_bytes() 같은 암호화 관련 기능을 사용할 수 있게 해줍니다.

```
CREATE TABLE example_table (
    id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
    name TEXT
);
```

2. 사용

```
SELECT generate_uuid_v7();

ecfb02e4-79ff-7cd9-8cd1-4a2c80f2b2c3 //결과
```

pgcrypto가 설치되었다면, 위의 generate_uuid_v7 함수를 작성하여 사용할 수 있습니다.  
작성 후에는 별도의 추가 설치 없이 함수 호출로 UUID v7을 생성할 수 있습니다.

---

참고

[uuidv4와 uuidv7 참고 블로그](https://mactto.tistory.com/m/entry/PostgreSQL%EC%97%90%EC%84%9C-PK%EB%A1%9C-UUID%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EB%95%8C-%EA%B3%A0%EB%A0%A4%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%84%B1%EB%8A%A5-%EC%9D%B4%EC%8A%88)
