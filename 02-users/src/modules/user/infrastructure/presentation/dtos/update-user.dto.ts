import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}