import '~utils/env.utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '~config/config.constants';
import { AppConfig } from './config';
import { Logger } from '~utils/logger.utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test app')
    .setDescription('Test app API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const { port: PORT, cors } = configService.get<AppConfig>(
    ConfigEnum.APP_CONFIG,
  );

  app.enableCors(cors);

  await app.listen(PORT, () => {
    Logger.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
