import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AuthModule } from './modules/auth/infrastructure/presentation/auth.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        SERVICE_USER_BY_EMAIL: Joi.string().required(),
        TOKEN_SECRET: Joi.string().required()
      }),
    }),  
    AuthModule  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
