  import { UserGetOneResult, UserResult } from '../../infrastructure/user.infrastructure';
  import { UpdateUserProps, User } from '../user';

  export abstract class UserRepository {
    abstract save(user: User): UserResult;
    abstract findById(userId: string): UserGetOneResult;
    abstract update(userId: string, user: UpdateUserProps): UserResult;
  };
