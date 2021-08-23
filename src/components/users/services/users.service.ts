import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { User } from '../entities/user.entity';
import { UserDbRepository } from '../repository/db/user.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDbRepository)
    private usersRepository: UserRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAllUser();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findUser(id);
  }
  async save(user: CreateUserDto): Promise<void> {
    await this.usersRepository.createUser(user);
  }

  // async update(id: string, user: UpdateUserDto): Promise<void> {
  //   await this.usersRepository.updateUser(id, user);
  // }
  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.usersRepository.updateUser(id, user);
  }

  async remove(id: string): Promise<void> {
    this.usersRepository.deleteUser(id);
  }
}
