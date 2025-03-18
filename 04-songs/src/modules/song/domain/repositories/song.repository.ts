import { SongResult } from "../../infrastructure/song.infrastructure";
import { Song } from "../song";

export abstract class SongRepository {
  abstract save(song: Song): SongResult;
};
