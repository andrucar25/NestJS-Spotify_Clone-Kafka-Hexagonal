import { IsString, IsNotEmpty, Allow } from 'class-validator';

export class UploadSongDto {
  @IsNotEmpty()
  @IsString()
  musicalGenre: string;

  @Allow() 
  file: any;
}