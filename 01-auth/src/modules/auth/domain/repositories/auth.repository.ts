import { Result } from "neverthrow";

import { User } from "../user";

export type AuthTokens = { accessToken: string; };
export type UserResult = Result<User, Error>;
export type AuthLoginResult = Result<AuthTokens, Error>;

export abstract class AuthRepository {
  abstract getUserByEmail(email: string): Promise<UserResult>;
}