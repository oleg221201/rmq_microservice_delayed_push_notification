import { OnQueueActive, OnQueueEvent, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JOB_NAME, QUEUE_NAME } from '~common/constants/bull.constants';
import { NotificationService } from './notification.service';
import { Logger } from '@nestjs/common';

@Processor(QUEUE_NAME)
export class NotificationConsumer {
  constructor(private readonly notificationService: NotificationService) {}

  @OnQueueActive()
  onActive(job: Job) {
    Logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process(JOB_NAME)
  async transcode(job: Job) {
    const { userId } = job.data;

    await this.notificationService.sendPushNotification(userId);
  }

  @OnQueueEvent('completed')
  onComplete(job: Job) {
    Logger.log(`Job ${job.id} has been completed`);
  }

  @OnQueueEvent('failed')
  onFailed(job: Job, error: Error) {
    Logger.log(`Job ${job.id} has failed with error ${error.message}`);
  }
}
