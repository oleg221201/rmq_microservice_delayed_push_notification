import '~utils/env.utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '~config/config.constants';
import { AppConfig } from './config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const configService = app.get(ConfigService);

  const { rmqUrl, rmqQueueName, port } = configService.get<AppConfig>(
    ConfigEnum.APP_CONFIG,
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: rmqQueueName,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  app.listen(port);
}
bootstrap();
