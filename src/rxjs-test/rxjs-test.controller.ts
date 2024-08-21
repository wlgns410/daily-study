import { Controller, Get } from '@nestjs/common';
import { RxjsTestService } from './rxjs-test.service';

@Controller('rxjs-test')
export class RxjsTestController {
  constructor(private readonly rxjsTestService: RxjsTestService) {}

  @Get()
  getData() {
    return this.rxjsTestService.getData();
  }
}
