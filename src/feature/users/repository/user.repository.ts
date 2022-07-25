import { UpdateResult } from 'typeorm';

import { CreateUserDto } from '@app/feature/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/feature/users/dto/update.user.dto';
import { User } from '@app/feature/users/entities/user.entity';

export interface UserRepository {
  findUser(id: string): Promise<User>;
  findAllUser(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User>;
  createUser(payload: CreateUserDto): Promise<User>;
  updateUser(id: string, user: UpdateUserDto): Promise<UpdateResult>;
  deleteUser(id: string): Promise<void>;
}
