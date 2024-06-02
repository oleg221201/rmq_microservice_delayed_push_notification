import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Queue } from 'bull';
import { catchError, firstValueFrom } from 'rxjs';
import { JOB_NAME, QUEUE_NAME } from '~common/constants/bull.constants';
import { ConfigEnum } from '~config/config.constants';
import { NotificationConfig } from '~config/types';

@Injectable()
export class NotificationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectQueue(QUEUE_NAME) private readonly notificationTasksQueue: Queue,
  ) {}

  async handler(userId: number): Promise<void> {
    const { delayInMs } = this.configService.get<NotificationConfig>(
      ConfigEnum.NOTIFICATION_CONFIG,
    );

    await this.notificationTasksQueue.add(
      JOB_NAME,
      {
        userId,
      },
      { delay: delayInMs },
    );
  }

  async sendPushNotification(userId: number): Promise<void> {
    const { webhookUrl } = this.configService.get<NotificationConfig>(
      ConfigEnum.NOTIFICATION_CONFIG,
    );

    await firstValueFrom(
      this.httpService.get(`${webhookUrl}?userId=${userId}`).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened! Message: ' + error.message;
        }),
      ),
    );
  }
}
