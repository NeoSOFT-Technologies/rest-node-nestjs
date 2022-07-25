import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from '@app/core/hashing/hashing';
import { ValidateUserDto } from '@app/feature/users/dto/validate.user.dto';
import { User } from '@app/feature/users/entities/user.entity';
import { UsersService } from '@app/feature/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  findUserByEmail(user: ValidateUserDto): Promise<User> {
    return this.usersService.findEmail(user.email);
  }

  async generateToken(user: ValidateUserDto): Promise<any> {
    try {
      const userData = await this.findUserByEmail(user);
      const isMatched = await comparePassword(user.password, userData.password);
      if (isMatched) {
        const payload = {
          id: userData.id,
          firstName: userData.firstName,
          email: userData.email,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
          access_token: accessToken,
        };
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
