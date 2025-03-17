import { err, ok } from 'neverthrow';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { AuthRepository, UserResult } from '../domain/repositories/auth.repository';
import { EmailNotRegisteredException, UserByEmailDatabaseException } from '../../../core/exceptions/database.exception';

@Injectable()
export class AuthInfrastructure implements AuthRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getUserByEmail(email: string): Promise<UserResult> {
    const userByEmailUrl = this.configService.get<string>('SERVICE_USER_BY_EMAIL');

    try {
  
      const response = await firstValueFrom(this.httpService.get(`${userByEmailUrl}?email=${email}`));

      if (!response.data) {
        return err(new EmailNotRegisteredException());
      }

      return ok(response.data); 
    } catch (error) {
      return err(new UserByEmailDatabaseException(error.message, error.stack)); 
    }

  }

}
