import { BadRequestException, Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { SongApplication } from '../../application/song.application';
import { Song } from '../../domain/song';
import { fileFilter } from '../../helpers/fileFilter';
import { UploadSongDto } from './dtos/upload-song.dto';

@Controller('songs')
export class SongController {
  constructor(
    @Inject(SongApplication)
    private readonly application: SongApplication
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    }
  }))
  async uploadSong(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadSongDto
  ) {

    if (!file) {
      throw new BadRequestException('File is required');
    }

    const { originalname, buffer } = file;
    const {musicalGenre} = body;

    const songProps = {name: originalname, fileBuffer: buffer};

    const song = new Song(songProps);

    const songSaved = await this.application.save(song);

    if (songSaved.isErr()) {
      throw songSaved.error;
    }

    const songName = songSaved.value.name;

    return {
      musicalGenre,
      songName
    };
  }
}