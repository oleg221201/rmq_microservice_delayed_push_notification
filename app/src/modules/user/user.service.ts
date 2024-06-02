import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AbstractService } from '~common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import {
  RMQ_MESSAGE_NAME,
  RMQ_NOTIFICATION_CLIENT,
} from '~common/constants/rmq-client.constants';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(RMQ_NOTIFICATION_CLIENT)
    private readonly rmqNotificationClient: ClientProxy,
  ) {
    super(userRepository);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.create({ ...dto });

    this.rmqNotificationClient.emit(RMQ_MESSAGE_NAME, { user });

    return user;
  }
}
