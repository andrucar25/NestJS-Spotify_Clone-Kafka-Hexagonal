import { BaseException } from './base.exception';
import { ErrorMessage } from './message.exception';

export class UserByEmailDatabaseException extends BaseException {
  constructor(message: string, stack?: string) {
    super(message, stack);
    this.name = ErrorMessage.USER_BY_EMAIL_DATABASE_EXCEPTION;
    this.status = 500;
  }
}
export class EmailNotRegisteredException extends BaseException {
  constructor() {
    super('Email is not registered');
    this.name = ErrorMessage.EMAIL_NOT_REGISTERED_EXCEPTION;
    this.status = 404;
  }
}
