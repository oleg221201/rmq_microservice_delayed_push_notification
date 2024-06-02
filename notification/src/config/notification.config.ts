import { registerAs } from '@nestjs/config';
import { NotificationConfig } from './types';
import { ConfigEnum } from './config.constants';

export { NotificationConfig };

export const notificationConfig = registerAs(
  ConfigEnum.NOTIFICATION_CONFIG,
  (): NotificationConfig => {
    const { WEBHOOK_URL, DELAY_IN_MS } = process.env;
    return {
      webhookUrl: WEBHOOK_URL,
      delayInMs: Number(DELAY_IN_MS) || 1000 * 60 * 60 * 24,
    };
  },
);
