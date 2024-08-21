import { Test, TestingModule } from '@nestjs/testing';
import { RxjsTestService } from './rxjs-test.service';

describe('RxjsTestService', () => {
  let service: RxjsTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RxjsTestService],
    }).compile();

    service = module.get<RxjsTestService>(RxjsTestService);
  });

  it('should return an array of uppercase strings', (done) => {
    const expectedResult = ['NESTJS', 'RXJS', 'TESTING'];
    service.getData().subscribe((result) => {
      expect(result).toEqual(expectedResult);
      done();
    });
  });
});
