export interface SongProps {
  name: string;
  fileBuffer: Buffer;
}

export interface SongResponse {
  name: string;
  filePath: string;
}

export class Song {
  private name: string;
  private fileBuffer: Buffer;
  
  constructor(props: SongProps) {
    Object.assign(this, props);
  }

  properties(): SongProps {
    return {
      name: this.name,
      fileBuffer: this.fileBuffer
    };
  }

}

