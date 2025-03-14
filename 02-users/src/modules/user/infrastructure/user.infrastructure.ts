import { Injectable } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import { DataSource, Repository } from 'typeorm';

import { BaseException } from '../../../core/exceptions/base.exception';
import { UpdateUserProps, User, UserProps } from '../domain/user';
import { UserGetOneDatabaseException, UserSaveDatabaseException, UserUpdateDatabaseException } from '../../../core/exceptions/database.exception';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

export type UserGetOneResult = Promise<Result<User | null, BaseException>>;
export type UserResult = Promise<Result<User, BaseException>>;

@Injectable()
export class UserInfrastructure implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    private readonly dataSource: DataSource
  ) {}

  async save(user: User): UserResult {
    try {
      const userEntity = this.repository.create(user.properties());

      await this.repository.save(userEntity);

      return ok(user);
    } catch (error) {
      return err(new UserSaveDatabaseException(error.message, error.stack));
    }
  }

  async findById(userId: string): UserGetOneResult {
    try {
      const result = await this.repository.findOne({
        where: {id: userId},
      });

      if (!result) return ok(null);

      const user: UserProps = {
        id: result.id,
        username: result.username,
        email: result.email,
        password: result.password,
        isActive: result.isActive,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      };
      
      return ok(new User(user));
    } catch (error) {
      return err(
        new UserGetOneDatabaseException(error.message, error.stack),
      );
    }
  }

  async update(userId: string, user: UpdateUserProps): UserResult {
    const userPreLoad = await this.repository.preload({ id: userId, ...user });

    if ( !userPreLoad ) {
      return err(new UserGetOneDatabaseException(`User with id: ${userId} not found`));
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(userPreLoad);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      const updatedUser = await this.findById( userId );

      if (updatedUser.isErr()) {
        return err(new UserUpdateDatabaseException('Error updating after find user', 'No stack'))
      }

      if(!updatedUser.value){
        return err(new UserGetOneDatabaseException(`User with id: ${userId} not found after update`));
      }

      return ok(updatedUser.value);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      return err(new UserUpdateDatabaseException(error.message, error.stack));
    }
  }

}
