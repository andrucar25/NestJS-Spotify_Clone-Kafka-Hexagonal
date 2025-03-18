import { HttpException, HttpStatus } from '@nestjs/common';

export class GatewayException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly errorType: string,
  ) {
    super({ message, error: errorType }, status);
  }
}