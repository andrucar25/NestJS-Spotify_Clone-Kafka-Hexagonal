import { Body, Controller, Inject, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
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

}