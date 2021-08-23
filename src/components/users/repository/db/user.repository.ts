import { CreateUserDto } from '../../dto/create.user.dto';
import { UpdateUserDto } from '../../dto/update.user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
@EntityRepository(User)
export class UserDbRepository extends Repository<User> implements UserRepository {
  constructor() {
    super();
  }
  findUser(id: string): Promise<User> {
    return this.findOne(id);
  }
  findAllUser(): Promise<User[]> {
    return this.find();
  }
  createUser(payload: CreateUserDto): Promise<User> {
    return this.save(payload);
  }
  // updateUser(id: string, payload: UpdateUserDto): Promise<User> {
  //   // let id = parseInt(id);
  //   return this.save({ ...payload, id });
  // }
  updateUser(id: string, user: UpdateUserDto): Promise<UpdateResult> {
    return this.update(id, {
      ...user,
    });
  }
  async deleteUser(id: string): Promise<void> {
    await this.findOneOrFail(id);
    await this.delete(id);
  }
}
