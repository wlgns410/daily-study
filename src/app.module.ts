import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/typeorm.config';
import { RxjsTestService } from './rxjs-test/rxjs-test.service';
import { RxjsTestController } from './rxjs-test/rxjs-test.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, RxjsTestController],
  providers: [AppService, RxjsTestService],
})
export class AppModule {}
