# bigint와 integer

보통 데이터베이스에 정수형을 저장할때 Integer를 사용한다.  
이는 32비트 정수의 한계치인 21억(2,147,483,647)은 32비트 정수(int 타입)에서 표현할 수 있는 최대값만 표현할 수 있다.  
때문에 64비트 부동소수점인 BIGINT 타입을 사용해서 약 **±9,223경(9,223,372,036,854,775,807)**까지의 범위을 다룰 수 있게 된다.

```
const bigNumber = BigInt("900719925474099123456789");
console.log(bigNumber); // 출력: 900719925474099123456789n
```

위 예시에서 BigInt를 사용해 매우 큰 정수를 표현할 수 있다.

## 문제

많은 ORM(Object-Relational Mapping) 라이브러리는 데이터베이스에서 BIGINT 타입을 사용할 때 언어의 데이터 타입과 매핑하는 데 제한이 있다.  
특히, JavaScript의 숫자는 64비트 부동소수점(number)이기 때문에, 큰 정수를 그대로 표현할 수 없는 문제가 발생한다.  
데이터베이스에서 BIGINT 필드를 직접 가져오면 JavaScript에서는 안전한 정수 범위를 초과할 가능성이 있기 때문에, 이를 문자열로 변환해서 가져오는 경우가 많다.

```
{
  "userId": "1234567891234567890000"
}
```

BIGINT를 JSON으로 전송할 때, 큰 숫자를 안전하게 전달하기 위해 문자열로 반환한다.

## mapper 패턴

JavaScript에서 **bigint**를 다루는 방식, 즉 데이터베이스에서는 string으로 가져오는데 비즈니스 로직에서는 정수형으로 처리해야하는 필요성이 생긴다.  
따라서 엔티티 객체와 도메인 객체를 분리하고 mapper pattern을 일반적으로 사용한다.

```
class UserMapper {
  static toDomain(entity) {
    return new User(entity.id);
  }

  static toEntity(domain) {
    return new UserEntity(domain.id.toString());
  }
}
```

위처럼 데이터베이스에서 BIGINT를 처리하는 방식 때문에, JavaScript에서는 매퍼 패턴을 사용하여 엔티티와 도메인 객체를 분리하고 필요한 변환 작업을 수행하곤 한다.
