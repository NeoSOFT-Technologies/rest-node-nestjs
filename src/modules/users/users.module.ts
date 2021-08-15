import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { UserDbRepository } from './repository/db/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbRepository])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
