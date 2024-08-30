# collation

<img width="600" alt="스크린샷 2024-08-30 오전 10 37 31" src="https://github.com/user-attachments/assets/c1eefb57-2b3d-44a5-ac49-14376dc6ee90">

## 설명

collation은 데이터베이스에서 문자열을 비교하거나 정렬할 때 사용하는 규칙을 말한다.  
collation은 데이터베이스, 스키마, 테이블, 열 단위로 설정할 수 있다.  
collation을 설정하면 데이터베이스에서 문자열을 비교하거나 정렬할 때 collation에 따라 결과가 달라진다.  

```
SELECT * FROM pg_collation;
```
이 명령어로 psql에서 사용 가능한 collation 목록을 확인할 수 있다.  

## 콜레이션 네이밍 컨벤션

`문자집합_언어종속_UCA버전_민감도` 형식으로 콜레이션 이름을 지정한다.

- 문자집합: 콜레이션의 문자집합을 나타낸다. 예를 들어 `UTF8`, `UTF8mb4` 등이다.
- 언어종속: 콜레이션의 언어종속을 나타낸다. 예를 들어 `ko_KR`는 한국어, `en_US`은 영어를 나타낸다.
- UCA버전: 콜레이션의 유니코드 정렬 알고리즘 버전을 나타낸다. 예를 들어 `UCA`는 유니코드 정렬 알고리즘을 나타낸다. 
- 민감도: 대소문자 민감도를 나타내며 `ci`, `cs` 등이 있고 `ci`는 대소문자를 구분하지 않으며 `cs`는 대소문자를 구분한다.

```
// UCA버전 참고
PostgreSQL은 전통적으로 ICU(International Components for Unicode) 라이브러리를 사용하여 유니코드 정렬과 비교 기능을 제공합니다.  
ICU 라이브러리는 다양한 언어 및 지역별 정렬 규칙을 지원하며, UCA 표준을 구현하고 있습니다.  
그러나 PostgreSQL 자체적으로 특정 UCA 버전을 명시하는 기능은 없습니다.

//유니코드 9.0 기반 정렬 규칙을 사용하는 콜레이션 생성
CREATE COLLATION uca_collation_v9 (
    provider = icu,
    locale = 'en-u-co-standard',
    deterministic = false
);

//유니코드 5.2 기반 정렬
CREATE COLLATION uca_collation_v52 (
    provider = icu,
    locale = 'en-u-co-standard-uca520',
    deterministic = false
);

//유니코드 10.0 기반 정렬 (이모티콘 정렬)
CREATE COLLATION uca_collation_v10 (
    provider = icu,
    locale = 'en-u-co-emoji',
    deterministic = false
);
```

따라서 유니코드 10.0 기반 정렬로 네이밍을 지정한다면, 


```
// 민감도 참고
_ai, _as, _ci, _cs, _ks, _bin과 같은 명시적인 민감도 설정은 PostgreSQL에서는 ICU를 통해 간접적으로 관리하게 되며, 명령어 자체로 제공되지는 않는다.
```

## 콜레이션 생성

```
CREATE COLLATION UTF8_ko_KR_uca_collation_v10_ci (
    provider = icu,
    locale = 'ko-KR-u-ks-level1',  -- 'ko-KR'은 한국어, 'u-co-standard'는 표준 UCA 정렬 규칙 사용
    deterministic = false
);
```

위처럼 커스텀 collation을 생성할 수 있다.

- provider = icu: ICU를 사용하여 유니코드 정렬 규칙을 적용함
- locale = 'ko-KR-u-ks-level1': ko-KR은 한국어(대한민국) 로케일을 의미하며, u-ks-level1은 ICU에서 대소문자 구분을 무시하도록 설정
- deterministic = true: 이 설정은 문자열 비교가 결정론적임을 의미

## 동작방식

![스크린샷 2024-08-30 오전 11 17 04](https://github.com/user-attachments/assets/4dc54150-db2a-44de-b2e7-99e1af58b1d8)


UCA의 가중치 레벨

```
1.	Level 1 (Primary Level): 기본적인 문자 비교를 수행하며, 보통 문자의 “기본 형태”에 해당하는 부분을 비교합니다. 이 단계에서는 대문자와 소문자를 동일하게 처리하거나(대소문자 무시), 악센트를 무시하는 등의 처리가 이루어질 수 있음
2.	Level 2 (Secondary Level): 주로 악센트와 같은 추가적인 특성을 비교하며 이 단계에서는 기본 형태가 같은 문자들 간에 악센트나 다른 디아크리틱 마크를 비교함
3.	Level 3 (Tertiary Level): 대소문자와 같은 경우를 비교하며, 이 단계에서는 대문자와 소문자, 글자의 굵기, 글자의 크기 등의 미세한 차이를 비교함
4.	Level 4 (Quaternary Level): 보통 매우 미세한 차이를 비교하거나, 특수한 용도에 사용함. 이 단계는 일반적으로 생략되지만, 필요에 따라 사용될 수 있음
```

```
INSERT INTO my_table (name) VALUES
('abc'),
('ABC'),
('ábč'),
('äbc'),
('aBc');

	1.	Primary Level: 기본 문자 형태에 따라 대략적으로 정렬
	'abc', 'ABC', 'ábč', 'äbc', 'aBc'
	2.	Secondary Level: 악센트와 같은 부가적인 특징을 고려하여 정렬
	'ABC', 'abc', 'aBc', 'äbc', 'ábč'
	3.	Tertiary Level: 대소문자를 고려하여 정렬
	'ABC', 'aBc', 'abc', 'äbc', 'ábč'
```

위처럼 콜레이션으로 정렬이 된다.

---

참고

[PostgreSQL: Documentation: 13: 22.2. Collation Support](https://www.postgresql.org/docs/13/collation.html)
[Collation](https://yozm.wishket.com/magazine/detail/2736/)
