import { Body, Controller, Inject, InternalServerErrorException, Patch, Post} from '@nestjs/common';

import { PlaylistApplication } from '../../application/playlist.application';
import { PlaylistCreateDto } from './dtos/playlist-create.dto';
import { Playlist } from '../../domain/playlist';
import { PlaylistGetDatabaseException, PlaylistSaveDatabaseException } from '../../../../core/exceptions/database.exception';
import { AddSongDto } from './dtos/add-song.dto';

@Controller('playlists')
export class PlaylistController {

  constructor(
    @Inject(PlaylistApplication)
    private readonly application: PlaylistApplication,
  ) {}

  @Post()
  async create(@Body() body: PlaylistCreateDto) {
    const playlistProps = {
      name: body.name,
      userId: body.userId,
      musicalGenre: body.musicalGenre,
      description: body.description,
      songs: body.songs
    };

    const playlist = new Playlist(playlistProps);

    const result = await this.application.save(playlist);

    if (result.isErr()) {
      if (result.error instanceof PlaylistSaveDatabaseException) {
        throw new InternalServerErrorException(result.error.message, {
          cause: result,
          description: result.error.stack,
        });
        
      }
    }

    if(result.isOk()){
      return result.value;
    }
  }

  @Patch('/add-song')
  async update(@Body() body: AddSongDto) {
    const {song, musicalGenre} = body;

    const result = await this.application.addSong(song, musicalGenre);

    if (result.isErr()) {
      if (
        result.error instanceof PlaylistGetDatabaseException ||
        result.error instanceof PlaylistSaveDatabaseException
      ) {
        throw new InternalServerErrorException(result.error.message, {
          cause: result,
          description: result.error.stack,
        });
      }
    }

    return { message: 'Song added to playlist' };
    
  }

}
