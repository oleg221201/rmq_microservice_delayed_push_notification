import { Controller } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { Payload, EventPattern } from '@nestjs/microservices';
import { RMQ_MESSAGE_NAME } from '~common/constants/rmq-client.constants';

@Controller()
export class AppController {
  constructor(private notificationService: NotificationService) {}

  @EventPattern(RMQ_MESSAGE_NAME)
  async handleUserCreation(@Payload() data: any): Promise<void> {
    await this.notificationService.handler(data.user.id);
  }
}
