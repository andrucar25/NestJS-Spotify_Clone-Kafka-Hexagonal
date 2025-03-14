import { Body, Controller, Get, Inject, InternalServerErrorException, Param, Patch, Post} from '@nestjs/common';

import { UserApplication } from '../../application/user.application';
import { UserCreateDto } from './dtos/create-user.dto';
import { User } from '../../domain/user';
import { UserGetOneDatabaseException, UserSaveDatabaseException } from '../../../../core/exceptions/database.exception';
import { UserIdDto } from './dtos/user-id.dto';
import { UserUpdateDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {

  constructor(
    @Inject(UserApplication)
    private readonly application: UserApplication,
  ) {}

  @Post()
  async create(@Body() body: UserCreateDto) {
    const userProps = {
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const user = new User(userProps);

    const result = await this.application.save(user);

    if (result.isErr()) {
      if (result.error instanceof UserSaveDatabaseException) {
        throw new InternalServerErrorException(result.error.message, {
          cause: result,
          description: result.error.stack,
        });
        
      }
    }

    if(result.isOk()){
      return result.value;
    }
  }

  @Patch('/:userId')
  async update(@Body() body: UserUpdateDto, @Param() param: UserIdDto) {
    const { userId } = param;

    const updatedUser = await this.application.update(userId, body);
   
    if (updatedUser.isErr()) {
      if (updatedUser.error instanceof UserGetOneDatabaseException) {
        throw new InternalServerErrorException(updatedUser.error.message, {
          cause: updatedUser,
          description: updatedUser.error.stack,
        });
      }
    } 

    if(updatedUser.isOk()){
      return updatedUser.value;
    }
    
  }

  @Get('/:userId')
  async getOne(@Param() param: UserIdDto) {
    const { userId } = param;

    const result = await this.application.findById(userId);

    if (result.isErr()) {
      if (result.error instanceof UserGetOneDatabaseException) {
        throw new InternalServerErrorException(result.error.message, {
          cause: result,
          description: result.error.stack,
        });
      }
    } 

    if(result.isOk()){
      return result.value;
    }
    
  }

}
