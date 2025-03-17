import { User, UserProps } from './user';

export class UserFactory {
  static create(props: UserProps): User {
    return new User(props);
  }
}