import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '5mb' })); // Limit for JSON
  app.use(urlencoded({ extended: true, limit: '5mb' })); // Limit for URL-encoded

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3040;

  await app.listen(port, () =>
    logger.log(
      `Application is running on: http://localhost:${port}`,
      'Nest Listen',
    ),
  );
}
bootstrap();
