import { AddSongResult, PlaylistResult } from "../../infrastructure/playlist.infrastructure";
import { Playlist } from "../playlist";

export abstract class PlaylistRepository {
  abstract save(playlist: Playlist): PlaylistResult;
  abstract addSong(song: string, musicalGenre: string): AddSongResult;
  // abstract save(user: User): UserResult;
  // abstract findById(userId: string): UserGetOneResult;
  // abstract update(userId: string, user: UpdateUserProps): UserResult;
  // abstract getByEmail(email: string): UserGetOneResult;
};
