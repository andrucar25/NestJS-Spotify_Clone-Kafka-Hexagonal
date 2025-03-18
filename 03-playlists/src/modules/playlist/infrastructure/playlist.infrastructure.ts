import { Injectable } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PlaylistRepository } from '../domain/repositories/playlist.repository';
import { Playlist } from '../domain/playlist';
import { PlaylistEntity } from './entities/playlist.entity';
import { BaseException } from '../../../core/exceptions/base.exception';
import { PlaylistGetDatabaseException, PlaylistSaveDatabaseException } from '../../../core/exceptions/database.exception';


export type PlaylistResult = Promise<Result<Playlist, BaseException>>;
export type AddSongResult = Promise<Result<void, BaseException>>;

@Injectable()
export class PlaylistInfrastructure implements PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly repository: Repository<PlaylistEntity>,

    private readonly dataSource: DataSource
  ) {}

  async save(playlist: Playlist): PlaylistResult {
    try {
      const playlistEntity = this.repository.create(playlist.properties());

      await this.repository.save(playlistEntity);

      return ok(playlist);
    } catch (error) {
      return err(new PlaylistSaveDatabaseException(error.message, error.stack));
    }
  }
  

  async addSong(song: string, musicalGenre: string): AddSongResult {
    try {
      const playlist = await this.repository.findOne({where: { musicalGenre }});
    
      if (!playlist) {
        return err(new PlaylistGetDatabaseException(`Playlist with ${ musicalGenre } musical genre not found`));
      }
      
        playlist.songs.push(song);
      
        await this.repository.save(playlist);
      
        return ok(); 

    } catch (error) {
      return err(new PlaylistSaveDatabaseException(error.message, error.stack));
    }
  }


}
