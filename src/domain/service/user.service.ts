import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../infrastructure/user/entity/user.entity';
import {
  RefreshMaterializedView,
  RefreshMaterializedViewService,
} from '../../infrastructure/materialize/refresh-materialize-view';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly refreshService: RefreshMaterializedViewService, // 주입받기
  ) {}

  @RefreshMaterializedView('user_queue_view')
  async createUser(data: Partial<UserEntity>) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
