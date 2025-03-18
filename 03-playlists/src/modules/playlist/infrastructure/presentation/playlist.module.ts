import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaylistController } from './playlist.controller';
import { PlaylistEntity } from '../entities/playlist.entity';
import { PlaylistInfrastructure } from '../playlist.infrastructure';
import { PlaylistRepository } from '../../domain/repositories/playlist.repository';
import { PlaylistApplication } from '../../application/playlist.application';


@Module({
  controllers: [PlaylistController],
  providers: [
    PlaylistInfrastructure,
    PlaylistApplication,
    {
      provide: PlaylistRepository,
      useExisting: PlaylistInfrastructure
    }
  ],
  imports: [
    TypeOrmModule.forFeature([PlaylistEntity])
  ]
})
export class PlaylistModule {}
