import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PlaylistApplication } from '../../application/playlist.application';

@Controller()
export class KafkaConsumer  {
  constructor(
    @Inject(PlaylistApplication)
    private readonly application: PlaylistApplication,
  ) {}

  @EventPattern('song-uploaded')
  async handleSongUploaded(@Payload() message: { musicalGenre: string; songName: string }) {
    const { musicalGenre, songName } = message;

    await this.application.addSong(songName, musicalGenre);
  }
}