import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  await app.listen(port, () =>
    logger.log(
      `Application is running on: http://localhost:${port}`,
      'Nest Listen',
    ),
  );
}
bootstrap();
