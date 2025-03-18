import { Inject, Injectable } from '@nestjs/common';

import { PlaylistRepository } from '../domain/repositories/playlist.repository';
import { Playlist } from '../domain/playlist';
import { PlaylistInfrastructure } from '../infrastructure/playlist.infrastructure';

@Injectable()
export class PlaylistApplication {
  constructor(
    @Inject(PlaylistInfrastructure)
    private readonly repository: PlaylistRepository,
  ) {}

  async save(playlist: Playlist) {
    return this.repository.save(playlist);
  }

  async addSong(song: string, musicalGenre: string) {
    return this.repository.addSong(song, musicalGenre);
  }


}
