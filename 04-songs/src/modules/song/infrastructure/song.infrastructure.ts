import { join } from 'path';
import { writeFile } from 'fs/promises';
import { err, ok, Result } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { SongRepository } from '../domain/repositories/song.repository';
import { Song, SongResponse } from '../domain/song';
import { BaseException } from '../../../core/exceptions/base.exception';
import { SongSaveDatabaseException } from '../../../core/exceptions/database.exception';


export type SongResult = Promise<Result<SongResponse, BaseException>>;

@Injectable()
export class SongInfrastructure implements SongRepository {
  private readonly uploadPath: string;

  constructor() {
    this.uploadPath = join(__dirname, '../../../../public/audios');
  }

  async save(song: Song): SongResult {
    try{
      const {name, fileBuffer} = song.properties();

      const fileName = `${uuidv4()}-${name}`;
      const filePath = join(this.uploadPath, fileName);

      await writeFile(filePath, fileBuffer);

      const response: SongResponse = {name: fileName, filePath: filePath};
      return ok(response);

    } catch(error) {
      return err(new SongSaveDatabaseException(error.message, error.stack));
    }
  }

}
