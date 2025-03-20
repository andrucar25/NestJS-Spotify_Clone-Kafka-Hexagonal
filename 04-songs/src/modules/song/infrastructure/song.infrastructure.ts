import { join } from 'path';
import { writeFile } from 'fs/promises';
import { err, ok, Result } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';

import { SongRepository } from '../domain/repositories/song.repository';
import { Song, SongResponse } from '../domain/song';
import { BaseException } from '../../../core/exceptions/base.exception';
import { SongSaveDatabaseException, SongStreamException } from '../../../core/exceptions/database.exception';
import { createReadStream, existsSync } from 'fs';


export type SongResult = Promise<Result<SongResponse, BaseException>>;

@Injectable()
export class SongInfrastructure implements SongRepository {
  private readonly audioPath: string;

  constructor() {
    this.audioPath = join(__dirname, '../../../../public/audios');
  }

  async save(song: Song): SongResult {
    try{
      const {name, fileBuffer} = song.properties();

      const fileName = `${uuidv4()}-${name}`;
      const filePath = join(this.audioPath, fileName);
      console.log("🚀 ~ SongInfrastructure ~ filePath:", filePath)

      await writeFile(filePath, fileBuffer);

      const response: SongResponse = {name: fileName, filePath: filePath};
      return ok(response);

    } catch(error) {
      return err(new SongSaveDatabaseException(error.message, error.stack));
    }
  }

  async stream(filename: string): Promise<StreamableFile> {
    try {
      const filePath = join(this.audioPath, filename);

      if (!existsSync(filePath)) {
        throw new NotFoundException('Audio file not found');
      }

      const file = createReadStream(filePath);
      return new StreamableFile(file);
    } catch (error) {
      throw new SongStreamException(error.message, error.stack);
    }
  }

}
