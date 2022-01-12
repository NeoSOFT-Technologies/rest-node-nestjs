import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '@app/components/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/components/users/dto/update.user.dto';
import { User } from '@app/components/users/entities/user.entity';
import { UserDbRepository } from '@app/components/users/repository/db/user.repository';
import { UserRepository } from '@app/components/users/repository/user.repository';

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

  findEmail(email: string, password: string): Promise<User> {
    return this.usersRepository.findUserByEmail(email, password);
  }

  async save(user: CreateUserDto): Promise<void> {
    await this.usersRepository.createUser(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.usersRepository.updateUser(id, user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
