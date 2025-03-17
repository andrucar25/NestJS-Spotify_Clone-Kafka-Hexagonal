import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3010;

  await app.listen(port, () =>
    logger.log(
      `Application is running on: http://localhost:${port}`,
      'Nest Listen',
    ),
  );
}
bootstrap();
