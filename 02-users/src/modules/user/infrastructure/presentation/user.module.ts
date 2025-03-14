import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserInfrastructure } from '../user.infrastructure';
import { UserApplication } from '../../application/user.application';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserInfrastructure,
    UserApplication,
    {
      provide: UserRepository,
      useExisting: UserInfrastructure
    }
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class UserModule {}
