import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongInfrastructure } from '../song.infrastructure';
import { SongApplication } from '../../application/song.application';
import { SongRepository } from '../../domain/repositories/song.repository';


@Module({
  controllers: [SongController],
  providers: [
    SongInfrastructure,
    SongApplication,
    {
      provide: SongRepository,
      useExisting: SongInfrastructure
    }
  ],
  imports: []
})
export class SongModule {}
