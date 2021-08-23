import { CreateUserDto } from '../../dto/create.user.dto';
import { UpdateUserDto } from '../../dto/update.user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { EntityRepository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
@EntityRepository(User)
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  findUser(id: string): Promise<User> {
    return new Promise<User>((resolve) => {
      const user = this.users.find((userData) => userData.id === id);
      resolve(user);
    });
  }

  findAllUser(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  createUser(payload: CreateUserDto): Promise<User> {
    return new Promise<User>((resolve) => {
      const user: User = { id: `this.users.length`, isActive: true, ...payload };
      this.users.push(user);
      resolve(user);
    });
  }

  // updateUser(id: string, payload: UpdateUserDto): Promise<User> {
  //   throw 'Implement update functionality';
  // }
  updateUser(id: string, payload: UpdateUserDto): Promise<UpdateResult> {
    throw 'Implement update functionality';
  }

  async deleteUser(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.users = this.users.filter((userData) => userData.id !== id);
      resolve();
    });
  }
}
