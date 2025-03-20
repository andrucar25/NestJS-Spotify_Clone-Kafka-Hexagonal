import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientKafka } from '@nestjs/microservices';

import { SongApplication } from '../../application/song.application';
import { Song } from '../../domain/song';
import { fileFilter } from '../../helpers/fileFilter';
import { UploadSongDto } from './dtos/upload-song.dto';
import { Response } from 'express';
import { join } from 'path';
import { statSync } from 'fs';

@Controller('songs')
export class SongController {
  constructor(
    @Inject(SongApplication)
    private readonly application: SongApplication,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
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

    //emit to kafka
    this.kafkaClient.emit('song-uploaded', {
      musicalGenre,
      songName,
    });

    return {
      musicalGenre,
      songName
    };
  }


  @Get('stream/:filename')
  async streamAudio(
    @Param('filename') filename: string,
    @Res({ passthrough: true}) response: Response
  ): Promise<StreamableFile> {
    
    const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}-.+.mp3$/;
    if (!UUID_REGEX.test(filename)) {
      throw new BadRequestException('Invalid filename format');
    }

    const streamableFile = await this.application.stream(filename);

    const filePath = join(process.cwd(), 'public', 'audios', filename);
    const stat = statSync(filePath);
    
    response.set({
      'Content-Length': stat.size,
      'Content-Type': 'audio/mpeg',
    });

    return streamableFile;
  }
}