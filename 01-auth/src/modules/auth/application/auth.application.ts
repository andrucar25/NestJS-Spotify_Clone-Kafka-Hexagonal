import { err, ok } from 'neverthrow';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthLoginResult, AuthRepository } from '../domain/repositories/auth.repository';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { Auth } from '../domain/auth';
import { AuthService } from './services/auth.service';
import { EmailNotRegisteredException } from '../../../core/exceptions/database.exception';

@Injectable()
export class AuthApplication {
  constructor(
    @Inject(AuthInfrastructure)
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(auth: Auth): Promise<AuthLoginResult> {

    const userResult = await this.repository.getUserByEmail(auth.properties().email);

    if(userResult.isErr()){
      if (userResult.error instanceof EmailNotRegisteredException) {
        return err(new UnauthorizedException('Email is not registered')); 
      }
      return err(userResult.error);
    }

    const user = userResult.value;

    const isValidPassword = await AuthService.validatePassword(auth.properties().password, user.password);

    if (!isValidPassword) {
      return err(new UnauthorizedException('Invalid password')); 
    }

    const payload = { username: user.username, email: user.email, id: user.id };
    const token = { accessToken: this.jwtService.sign(payload)};

    return ok(token);

  }

}
