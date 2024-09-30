# nestjs class-validator

컨트롤러에서 **ValidationPipe**를 적용하여 요청이 들어올 때 자동으로 DTO 유효성 검사를 수행할 수 있다.

```
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsString, IsInt, Min, Max } from 'class-validator';

class UserDto {
  @IsString()
  username: string;

  @IsInt()
  @Min(0)
  @Max(100)
  age: number;
}

@Controller('users')
export class UserController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))  // ValidationPipe를 사용하여 자동으로 유효성 검사를 수행
  createUser(@Body() userDto: UserDto) {
    return 'User created!';
  }
}
```

1. `class-validator` 로 UserDto에 유효성 검증 규칙을 정의한다.
2. `@UsePipes(ValidationPipe)`: 컨트롤러 메서드에서 **ValidationPipe**를 적용하면, DTO에 정의된 유효성 검사가 자동으로 실행한다.
3. 자동 검증: 이 방식으로 처리하면, 클라이언트에서 들어온 데이터가 DTO 클래스에서 정의된 규칙을 만족하지 않으면 자동으로 400 Bad Request 응답을 반환한다.

dto와 controller를 이용하면 손 쉽게 badrequest 처리를 할 수 있어 로직이 매우 간단해진다.
