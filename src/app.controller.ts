import { Request, Response } from '@app/core';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from '@app/app.service';
import AppLogger from '@app/core/logger/AppLogger';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/jwt.auth.guard';

@ApiTags('nest_app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appLogger: AppLogger) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('Jwt-auth')
  getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    this.appLogger.log('API called');
    return res.success(this.appService.getHello());
  }
}
