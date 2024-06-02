import { registerAs } from '@nestjs/config';
import { AppConfig } from './types';
import { ConfigEnum } from './config.constants';

export { AppConfig };

export const appConfig = registerAs(ConfigEnum.APP_CONFIG, (): AppConfig => {
  const { PORT, RMQ_URL, RMQ_QUEUE_NAME } = process.env;
  return {
    port: Number(PORT) || 3001,
    rmqUrl: RMQ_URL || 'amqp://guest:guest@127.0.0.1:5672',
    rmqQueueName: RMQ_QUEUE_NAME || 'queueName',
  };
});
