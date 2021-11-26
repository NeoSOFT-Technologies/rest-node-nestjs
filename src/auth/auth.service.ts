import { ValidateUserDto } from '@app/components/users/dto/validate.user.dto';
import { User } from '@app/components/users/entities/user.entity';
import { UsersService } from '@app/components/users/services/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  findUserByEmail(user: ValidateUserDto): Promise<User> {
    return this.usersService.findEmail(user.email);
  }

  generateToken(user: ValidateUserDto): Promise<any> {
    // return this.findUserByEmail(user);
    return this.findUserByEmail(user).then((userData) => {
      if (!userData) {
        return {
          status: 404,
          message: 'Invalid Credentials',
        };
      }
      const payload = `${userData.firstName}${userData.id}`;
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
      };
    });
  }
}
