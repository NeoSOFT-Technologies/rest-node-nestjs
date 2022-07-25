import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDbRepository } from '@app/feature/users/repository/db/user.repository';
import { UsersService } from '@app/feature/users/services/users.service';
import { UsersController } from '@app/feature/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbRepository])],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
