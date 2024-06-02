import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as config from '~config/index';
import { BullModule } from '@nestjs/bull';
import { RedisConfig } from '~config/types';
import { ConfigEnum } from '~config/config.constants';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: Object.values(config),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>(
          ConfigEnum.REDIS_CONFIG,
        );

        return {
          redis: redisConfig,
        };
      },
    }),
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
