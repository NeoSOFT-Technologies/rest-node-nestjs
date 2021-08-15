import { User } from './entities/user.entity';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Request, Response } from '@libs/core';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from './dto/create.user.dto';

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
      console.log(user);
      await this.usersService.save(user);
      return res.success('success', StatusCodes.CREATED);
    } catch (e) {
      return res.error(e);
    }
  }
}
