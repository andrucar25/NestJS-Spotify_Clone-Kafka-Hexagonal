import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
