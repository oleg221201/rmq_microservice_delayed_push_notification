import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from '~common/constants/bull.constants';
import { NotificationConsumer } from './notification.consumer';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  providers: [NotificationService, NotificationConsumer],
  exports: [NotificationService],
})
export class NotificationModule {}
