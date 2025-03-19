// import FormData from 'form-data';
import * as FormData from 'form-data';
import { Body, Controller, Inject, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { GatewayApplication } from '../../application/gateway.application';
import { JwtAuthGuard } from '../../../core/guards/jwt.guard';

@Controller('api')
export class GatewayController {
  constructor(
    @Inject(GatewayApplication)
    private readonly application: GatewayApplication,
    private readonly configService: ConfigService
  ) {}

  @Post('auth/login')
  async login(@Body() body) {
    const authLoginUrl = this.configService.get<string>('SERVICE_AUTH_LOGIN')!; 
    const result = await this.application.endpointRequest(authLoginUrl, 'POST', body);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }

  @Post('users')
  async saveUser(@Body() body) {
    const saveUserUrl = this.configService.get<string>('SERVICE_USER')!; 

    const result = await this.application.endpointRequest(saveUserUrl, 'POST', body);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }

  @Patch('users/:userId')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() body, @Param() param: {userId: string}) {
    const { userId } = param;

    const updateUserUrl = `${this.configService.get<string>('SERVICE_USER')}/${userId}`; 

    const result = await this.application.endpointRequest(updateUserUrl, 'PATCH', body);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }

  @Post('playlists')
  @UseGuards(JwtAuthGuard)
  async savePlaylist(@Body() body, @Request() req) {
    const savePlaylistUrl = this.configService.get<string>('SERVICE_PLAYLIST')!; 

    const userId = req.user.userId;
    const bodyWithUserId = { ...body, userId };
    const result = await this.application.endpointRequest(savePlaylistUrl, 'POST', bodyWithUserId);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }

  @Post('songs')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadSong (
    @UploadedFile() file: Express.Multer.File,
    @Body() body) {

      const uploadSongUrl = this.configService.get<string>('SERVICE_SONG')!;
      const formData = new FormData();
      if(file){
        formData.append('file', file.buffer, file.originalname);
      }
      if(body.musicalGenre){
        formData.append('musicalGenre', body.musicalGenre);
      }

      const result = await this.application.endpointRequest(uploadSongUrl, 'POST', formData);
  
      if (result.isErr()) {
        throw result.error;
      }
  
      return result.value;
  }

}