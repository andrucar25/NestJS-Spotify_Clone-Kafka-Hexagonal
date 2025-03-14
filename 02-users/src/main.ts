import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3020;

  await app.listen(port, () =>
    logger.log(
      `Application is running on: http://localhost:${port}`,
      'Nest Listen',
    ),
  );
}
bootstrap();
