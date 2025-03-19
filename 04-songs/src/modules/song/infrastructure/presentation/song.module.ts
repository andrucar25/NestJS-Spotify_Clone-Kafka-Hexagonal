import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { SongController } from './song.controller';
import { SongInfrastructure } from '../song.infrastructure';
import { SongApplication } from '../../application/song.application';
import { SongRepository } from '../../domain/repositories/song.repository';


@Module({
  controllers: [SongController],
  providers: [
    SongInfrastructure,
    SongApplication,
    {
      provide: SongRepository,
      useExisting: SongInfrastructure
    }
  ],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'song-kafka',
              brokers: [configService.get<string>('KAFKA_BROKER')!],
            },
            producer: {
              sessionTimeout: 30000,
              heartbeatInterval: 10000,
              allowAutoTopicCreation: true
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ]
})
export class SongModule {}
