# typia

typia는 런타임에 JSON 데이터를 파싱하고, 타입을 안전하게 검사하는 코드를 자동으로 생성할 수 있게 해준다.  
TS는 기본적으로 컴파일 타임에만 사용되며, 런타임에는 사라진다.  
따라서 런타임에는 타입검사나 데이터 검증이 자동으로 이루어지지 않아 런타임 시에 에러가 날 수 있게 된다.

## 역할

**typia**는 컴파일 타임에 TypeScript의 타입 정보를 사용하여 런타임에서 사용할 수 있는 검증 코드를 자동으로 생성해준다.  
즉, 컴파일 타임에 정의한 타입에 따라 런타임에서 데이터가 올바른지 검증하는 함수를 만들어 주는 것이다.  
이렇게 함으로써 런타임에서도 타입 검증을 수행할 수 있어, 외부 데이터나 사용자의 입력을 안전하게 처리할 수 있게 된다.

```
// AS-IS
// eslint-disable-next-line import/prefer-default-export
export function supportSequelizeOpOnQuery(ctx: Context): void {
  const params = ctx.params as { query?: { [key: string]: unknown } | string };
  if (params.query) {
    if (typeof params.query === 'string') {
      params.query = JSON.parse(params.query) as { [key: string]: unknown };
    }
    params.query = operatorReplacer(params.query) as { [key: string | symbol]: unknown };
  }
}
```

```
//TO-BE
import typia from "typia";

// eslint-disable-next-line import/prefer-default-export
export function supportSequelizeOpOnQuery(ctx: Context): void {
  // 타입 정의
  type QueryParams = { [key: string]: unknown };

  // typia를 사용하여 JSON 파싱 및 타입 검증 함수 생성
  const parseQueryParams = typia.createParse<QueryParams>();

  const params = ctx.params as { query?: QueryParams | string };

  if (params.query) {
    if (typeof params.query === 'string') {
      try {
        // JSON 파싱 및 타입 검증 수행
        params.query = parseQueryParams(params.query);
      } catch (error) {
        console.error("Invalid JSON format for query:", error);
        return;
      }
    }
    // operatorReplacer 호출
    params.query = operatorReplacer(params.query) as { [key: string | symbol]: unknown };
  }
}

```

JSON 파싱 중에 타입을 검증하므로, 입력 데이터의 타입 안전성을 유지할 수 있게 됨.  
`typia.createParse`를 사용해 타입 검증과 파싱을 한 번에 수행할 수 있음  
위처럼 JSON 파싱 및 타입 검증을 런타임에서 수행해서 예상치 못한 에러를 방지하고 데이터의 안전성을 확보할 수 있게 된다.
