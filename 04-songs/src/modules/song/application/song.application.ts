import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { Song } from '../domain/song';
import { SongRepository } from '../domain/repositories/song.repository';
import { SongInfrastructure } from '../infrastructure/song.infrastructure';

@Injectable()
export class SongApplication {
  constructor(
    @Inject(SongInfrastructure)
    private readonly repository: SongRepository,
  ) {}

  async save(song: Song) {
    return this.repository.save(song);
  }

  async stream(filename: string): Promise<StreamableFile> {
    return this.repository.stream(filename);
  }

}
