import { User } from '@app/components/users/entities/user.entity';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UsersService } from '@app/components/users/services/users.service';
import { Request, Response } from '@app/core';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '@app/components/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/components/users/dto/update.user.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiResponse } from '@app/components/users/constants/api.response.dto';
import { JwtAuthGuard } from '@app/auth/jwt.auth.guard';

@ApiTags('user_api')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Versioning API
  @Version('1')
  @Get()
  @ApiOkResponse({ description: apiResponse.apiUserGetResponseV1 })
  async getUsersV1(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      return res.success('Response from API version 1');
    } catch (e) {
      return res.error(e);
    }
  }

  @Version('2')
  @Get()
  @ApiOkResponse({ description: apiResponse.apiUserGetResponseV2 })
  async getUsersV2(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      return res.success('Response from API version 2');
    } catch (e) {
      return res.error(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Version(VERSION_NEUTRAL)
  @Get()
  @ApiOkResponse({ description: apiResponse.apiUserGetResponseNeutral })
  @ApiBearerAuth('JWT-auth')
  async getUsers(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const users: User[] = await this.usersService.findAll();
      return res.success(users);
    } catch (e) {
      return res.error(e);
    }
  }

  @Post()
  @ApiCreatedResponse({ description: apiResponse.apiUserCreatedResponse })
  @ApiBody({ type: CreateUserDto })
  async saveUser(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const user: CreateUserDto = req.body;
      await this.usersService.save(user);
      return res.success('success', StatusCodes.CREATED);
    } catch (e) {
      return res.error(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: apiResponse.apiUserGetById })
  @ApiBearerAuth('JWT-auth')
  async getUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const userById = await this.usersService.findOne(id);
      return res.success(userById, StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: apiResponse.apiUserDeletedResponse })
  @ApiBearerAuth('JWT-auth')
  async deleteUser(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      await this.usersService.remove(id);
      return res.success('Deletion Successfull', StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: apiResponse.apiUserUpdatedResponse })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('JWT-auth')
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
