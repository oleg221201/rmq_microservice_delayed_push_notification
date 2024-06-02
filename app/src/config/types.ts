import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type AppConfig = {
  port: number;
  cors: CorsOptions;
  rmqUrl: string;
  rmqQueueName: string;
};

export type DBConfig = TypeOrmModuleOptions;
