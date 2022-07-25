import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPassword } from '@app/core/hashing/hashing';
import { CreateUserDto } from '@app/feature/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/feature/users/dto/update.user.dto';
import { User } from '@app/feature/users/entities/user.entity';
import { UserDbRepository } from '@app/feature/users/repository/db/user.repository';
import { UserRepository } from '@app/feature/users/repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDbRepository)
    private readonly usersRepository: UserRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAllUser();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findUser(id);
  }

  findEmail(email: string): Promise<User> {
    return this.usersRepository.findUserByEmail(email);
  }

  async save(user: CreateUserDto): Promise<void> {
    const password = await hashPassword(user.password);
    await this.usersRepository.createUser({ ...user, password });
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.usersRepository.updateUser(id, user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
