# zapatos 란

Zapatos는 TypeScript 기반의 SQL 쿼리 빌더이자 데이터베이스 타입-안정성 라이브러리이다.  
Zapatos의 주요 장점은 데이터베이스 테이블 구조에서 직접 생성한 타입 정보를 기반으로 타입 안정성을 보장한다는 점이다.  
보통 쿼리가 복잡하게 되면 orm보다는 raw query를 짜게 되는 모습을 종종 볼 수 있다.  
하지만, raw query는 type check나 lint 문제를 해결해주지 않아 불편함을 느꼈을 것이다.
`zapatos` 를 사용한다면, SQL 쿼리를 작성할 때 코드의 타입 오류를 줄이고, 데이터베이스의 구조 변경에 빠르게 대응할 수 있다.

## 단점

TypeORM과 Zapatos가 각각의 커넥션 풀을 가지게 된다.  
따라서 커넥션 풀이 여러개가 존재하게 되어 리소스 낭비가 될 수 있다.  
TypeORM은 자체 커넥션 풀을 사용하고, Zapatos는 직접 설정한 풀(예: pg.Pool)을 사용하기 때문이다.  
하지만 하나의 커넥션 풀을 공유하도록 설정할 수도 있다.  
이렇게 하면 리소스 사용량을 줄이고 데이터베이스 연결을 더 효율적으로 관리할 수 있게 된다.

## 하나의 커넥션 풀 공유

우선 TypeORM을 통해 연결된 데이터베이스에서 Pool 가져온다.

```
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  getPool() { // 커넥션 풀 공유 위함
    return this.dataSource.createQueryRunner().connection;
  }
}
```

이처럼 type에 대해 check를 할 수 있어 안정성이 향상된다.

```
import { Injectable } from '@nestjs/common';
import * as db from 'zapatos/db';
import { DatabaseService } from './database.service';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPostsByUserNamePrefix(namePrefix: string) {
    // TypeORM의 커넥션 풀을 사용해 Zapatos에서 쿼리를 실행
    const pool = this.databaseService.getPool();

    return await db.sql<
      (db.posts.JSONSelectable & { user_name: string })[]
    >`
      SELECT ${'posts'}.${'id'}, ${'posts'}.${'title'}, ${'posts'}.${'content'}, ${'users'}.${'name'} AS user_name
      FROM ${'posts'}
      JOIN ${'users'} ON ${'posts'}.${'user_id'} = ${'users'}.${'id'}
      WHERE ${'users'}.${'name'} LIKE ${db.param(`${namePrefix}%`)}
    `.run(pool);
  }
}

```

getPostsByUserNamePrefix 함수가 DatabaseService에서 가져온 커넥션 풀을 사용하여 Zapatos 쿼리를 실행하도록 설정되었다.  
TypeORM과 Zapatos가 동일한 커넥션 풀을 공유하게 된다.  
getPool 메서드를 통해 Zapatos가 TypeORM의 커넥션 풀을 재사용하므로, 따로 Zapatos 전용 커넥션 풀이 생기지 않게 되는 것을 볼 수 있다.
