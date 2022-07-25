import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/core/auth/jwt.auth.guard';
import { apiResponse } from '@app/feature/users/constants/api.response.dto';
import { CreateUserDto } from '@app/feature/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/feature/users/dto/update.user.dto';
import { User } from '@app/feature/users/entities/user.entity';
import { UsersService } from '@app/feature/users/services/users.service';

@ApiTags('user_api')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: apiResponse.apiUserGetResponse })
  @ApiBearerAuth('JWT-auth')
  async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.usersService.findAll();
      return users;
    } catch (e) {
      throw e;
    }
  }

  @Post()
  @ApiCreatedResponse({ description: apiResponse.apiUserCreatedResponse })
  @ApiBody({ type: CreateUserDto })
  async saveUser(@Body() body: CreateUserDto): Promise<string> {
    try {
      const user: CreateUserDto = body;
      await this.usersService.save(user);
      return 'success';
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: apiResponse.apiUserGetById })
  @ApiBearerAuth('JWT-auth')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const userById = await this.usersService.findOne(id);
      return userById;
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: apiResponse.apiUserDeletedResponse })
  @ApiBearerAuth('JWT-auth')
  async deleteUser(@Param('id') id: string): Promise<string> {
    try {
      await this.usersService.remove(id);
      return 'Deletion Successfull';
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: apiResponse.apiUserUpdatedResponse })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('JWT-auth')
  async updateUserById(@Body() body: UpdateUserDto, @Param('id') id: string): Promise<string> {
    try {
      const updateUser: UpdateUserDto = body;
      await this.usersService.update(id, updateUser);
      return 'Updation Successfull';
    } catch (e) {
      throw e;
    }
  }
}
