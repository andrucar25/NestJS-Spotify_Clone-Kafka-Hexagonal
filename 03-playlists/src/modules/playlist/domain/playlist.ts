export interface PlaylistEssentials {
  name: string,
  userId: string,
  musicalGenre: string
}

export interface PlaylistOptionals {
  id: string,
  description: string,
  songs: string[],
}

export type PlaylistProps = PlaylistEssentials & Partial<PlaylistOptionals>;

export class Playlist {
  private readonly id: string;
  private readonly userId: string;
  private name: string;
  private description: string;
  private songs: string[];
  private musicalGenre: string;

  
  constructor(props: PlaylistProps) {
    Object.assign(this, props);
  }

  properties(): PlaylistProps {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      description: this.description,
      songs: this.songs,
      musicalGenre: this.musicalGenre
    };
  }

}

