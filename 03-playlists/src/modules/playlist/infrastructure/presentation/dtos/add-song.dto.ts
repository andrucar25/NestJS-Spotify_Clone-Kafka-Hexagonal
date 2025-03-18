import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSongDto {
  @IsString()
  @IsNotEmpty()
  song: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase()) 
  musicalGenre: string;

}
