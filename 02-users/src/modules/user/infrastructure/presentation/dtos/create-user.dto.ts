import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @Length(1, 50)
  username: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

}
