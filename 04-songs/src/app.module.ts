import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SongModule } from './modules/song/infrastructure/presentation/song.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required()
      }),
    }),
    SongModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
