import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthInfrastructure } from '../auth.infrastructure';
import { AuthApplication } from '../../application/auth.application';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthInfrastructure,
    AuthApplication,
    {
      provide: AuthRepository,
      useExisting: AuthInfrastructure
    }
  ],
  imports: [
    HttpModule, 
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '7d' }, 
      }),
    }),
  ]
})
export class AuthModule {}
