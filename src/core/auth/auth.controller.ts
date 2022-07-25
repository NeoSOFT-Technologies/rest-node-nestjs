import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@app/core/auth/auth.service';
import { ValidateUserDto } from '@app/feature/users/dto/validate.user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: ValidateUserDto })
  async generateToken(@Body() body: ValidateUserDto): Promise<any> {
    try {
      const user: ValidateUserDto = body;
      return await this.authService.generateToken(user);
    } catch (e) {
      throw e;
    }
  }
}
