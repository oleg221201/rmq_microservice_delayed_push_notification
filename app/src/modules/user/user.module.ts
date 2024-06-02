import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '~config/types';
import { ConfigEnum } from '~config/config.constants';
import { RMQ_NOTIFICATION_CLIENT } from '~common/constants/rmq-client.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.registerAsync([
      {
        name: RMQ_NOTIFICATION_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientProvider => {
          const { rmqQueueName, rmqUrl } = configService.get<AppConfig>(
            ConfigEnum.APP_CONFIG,
          );

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmqUrl],
              queue: rmqQueueName,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
