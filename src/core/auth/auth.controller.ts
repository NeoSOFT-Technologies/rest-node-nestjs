import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

import { Request, Response } from '@app/core';
import { AuthService } from '@app/core/auth/auth.service';
import { ValidateUserDto } from '@app/feature/users/dto/validate.user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: ValidateUserDto })
  async generateToken(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const user: ValidateUserDto = req.body;
      const resWithAcessToken = await this.authService.generateToken(user);
      return res.success(resWithAcessToken, StatusCodes.OK);
    } catch (e) {
      return res.error(e);
    }
  }
}
