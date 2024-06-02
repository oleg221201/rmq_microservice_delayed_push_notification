export type AppConfig = {
  port: number;
  rmqUrl: string;
  rmqQueueName: string;
};

export type NotificationConfig = {
  webhookUrl: string;
  delayInMs: number;
};

export type RedisConfig = {
  host: string;
  port: number;
};
