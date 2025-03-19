import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayModule } from './modules/infrastructure/presentation/gateway.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        TOKEN_SECRET: Joi.string().required(),
        SERVICE_AUTH_LOGIN: Joi.string().required(),
        SERVICE_USER: Joi.string().required(),
        SERVICE_PLAYLIST: Joi.string().required(),
        SERVICE_SONG: Joi.string().required(),
      }),
    }),  
    GatewayModule  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
