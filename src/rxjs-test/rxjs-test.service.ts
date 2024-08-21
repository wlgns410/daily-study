import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class RxjsTestService {
  getData(): Observable<string[]> {
    const data = ['NestJS', 'RxJS', 'Testing'];
    return of(data).pipe(
      delay(1000),
      map((items) => items.map((item) => item.toUpperCase())), // 1초 후 모든 데이터를 대문자로 변환
    );
  }
}
