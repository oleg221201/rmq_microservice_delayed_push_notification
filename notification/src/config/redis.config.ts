import { registerAs } from '@nestjs/config';
import { RedisConfig } from './types';
import { ConfigEnum } from './config.constants';

export { RedisConfig };

export const redisConfig = registerAs(
  ConfigEnum.REDIS_CONFIG,
  (): RedisConfig => {
    const { REDIS_HOST, REDIS_PORT } = process.env;

    return {
      host: REDIS_HOST || 'localhost',
      port: Number(REDIS_PORT) || 6379,
    };
  },
);
