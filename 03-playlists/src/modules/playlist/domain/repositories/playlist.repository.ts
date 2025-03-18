import { AddSongResult, PlaylistResult } from "../../infrastructure/playlist.infrastructure";
import { Playlist } from "../playlist";

export abstract class PlaylistRepository {
  abstract save(playlist: Playlist): PlaylistResult;
  abstract addSong(song: string, musicalGenre: string): AddSongResult;
};
