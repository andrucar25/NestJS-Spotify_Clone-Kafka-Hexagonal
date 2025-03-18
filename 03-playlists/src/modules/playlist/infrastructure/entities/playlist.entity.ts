import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'playlist' })
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  songs: string[];

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  musicalGenre: string;

}
