import { registerAs } from '@nestjs/config';
import { DBConfig } from './types';
import { ConfigEnum } from './config.constants';
import '../utils/env.utils';

export { DBConfig };

export const dbConfig = registerAs(ConfigEnum.DB_CONFIG, (): DBConfig => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
  return {
    type: 'postgres',
    host: DB_HOST || 'localhost',
    port: Number(DB_PORT) || 5432,
    username: DB_USER || 'postgres',
    password: DB_PASS,
    database: DB_NAME,
    entities: ['dist/**/*.entity.js'],
    synchronize: true, // DON'T DO THIS EVER !!!! (onle for test task)
  };
});
