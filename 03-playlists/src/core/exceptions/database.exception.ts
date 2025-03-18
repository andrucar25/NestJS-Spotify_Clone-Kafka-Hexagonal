import { BaseException } from './base.exception';
import { ErrorMessage } from './message.exception';

export class PlaylistSaveDatabaseException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.PLAYLIST_SAVE_DATABASE_EXCEPTION;
    this.status = 500;
  }
}

export class SongAddDatabaseException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.ADD_SONG_DATABASE_EXCEPTION;
    this.status = 500;
  }
}

export class PlaylistGetDatabaseException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.GET_PLAYLIST_DATABASE_EXCEPTION;
    this.status = 500;
  }
}
