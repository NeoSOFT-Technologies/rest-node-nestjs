import { User } from './entities/user.entity';
import { Controller, Delete, Get, Param, Patch, Post, Req, Res, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Request, Response } from '@app/core';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const users: User[] = await this.usersService.findAll();
      return res.success(users);
    } catch (e) {
      return res.error(e);
    }
  }

  @Post()
  async saveUser(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const user: CreateUserDto = req.body;
      await this.usersService.save(user);
      return res.success('success', StatusCodes.CREATED);
    } catch (e) {
      return res.error(e);
    }
  }
  @Get(':id')
  async getUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const userById = await this.usersService.findOne(id);
      return res.success(userById, StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }
  @Delete(':id')
  async deleteUser(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      await this.usersService.remove(id);
      return res.success('Deletion Successfull', StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }
  @Patch(':id')
  async updateUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const updateUser: UpdateUserDto = req.body;
      await this.usersService.update(id, updateUser);
      return res.success('Updation Successfull');
    } catch (e) {
      return res.error(e);
    }
  }
}
