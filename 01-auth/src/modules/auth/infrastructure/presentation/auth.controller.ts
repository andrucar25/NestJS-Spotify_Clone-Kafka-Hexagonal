import { Body, Controller, Inject, Post} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthApplication } from '../../application/auth.application';
import { Auth } from '../../domain/auth';


@Controller('auth')
export class AuthController {

  constructor(
    @Inject(AuthApplication)
    private readonly application: AuthApplication,
  ) {}

  @Post('login')
  async create(@Body() body: LoginDto) {
    const authData = new Auth(body);
    const loginResult = await this.application.login(authData);
    
    if (loginResult.isErr()) {
      throw loginResult.error;
    }

    return loginResult.value
  }

}
