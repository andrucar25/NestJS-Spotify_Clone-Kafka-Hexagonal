import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../domain/repositories/user.repository';
import { UpdateUserProps, User } from '../domain/user';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';
import { BCrypt } from '../../../libraries/bcrypt';

@Injectable()
export class UserApplication {
  constructor(
    @Inject(UserInfrastructure)
    private readonly repository: UserRepository,
  ) {}

  async save(user: User) {
    const hashedPassword = await BCrypt.hash(user.getPassword());
    user.setPassword(hashedPassword);

    return this.repository.save(user);
  }

  async update(userId: string, user: UpdateUserProps) {
    return this.repository.update(userId, user);
  }

  async findById(userId: string) {
    return this.repository.findById(userId);
  }

  async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

}
