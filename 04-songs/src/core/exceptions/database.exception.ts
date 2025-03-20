import { BaseException } from './base.exception';
import { ErrorMessage } from './message.exception';

export class SongSaveDatabaseException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.SONG_SAVE_DATABASE_EXCEPTION;
    this.status = 500;
  }
}

export class SongValidationException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.SONG_VALIDATION_EXCEPTION;
    this.status = 400;
  }
}

export class SongFileSystemException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.SONG_FILE_SYSTEM_EXCEPTION;
    this.status = 500;
  }
}

export class SongStreamException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.SONG_STREAM_EXCEPTION;
    this.status = 500;
  }
}