import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ValidateUserDto } from '@app/components/users/dto/validate.user.dto';
import { User } from '@app/components/users/entities/user.entity';
import { UsersService } from '@app/components/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  findUserByEmail(user: ValidateUserDto): Promise<User> {
    return this.usersService.findEmail(user.email, user.password);
  }

  async generateToken(user: ValidateUserDto): Promise<any> {
    const userData = await this.findUserByEmail(user);
    const payload = `${userData.firstName}${userData.id}`;
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }
}
