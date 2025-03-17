import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule} from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { GatewayController } from './gateway.controller';
import { GatewayInfrastructure } from '../gateway.infrastructure';
import { GatewayApplication } from '../../application/gateway.application';
import { GatewayRepository } from '../../domain/repositories/gateway.repository';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  controllers: [GatewayController],
  providers: [
    GatewayInfrastructure,
    GatewayApplication,
    {
      provide: GatewayRepository,
      useExisting: GatewayInfrastructure
    },
    JwtStrategy
  ],
  imports: [
    HttpModule, 
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ]
})
export class GatewayModule {}
