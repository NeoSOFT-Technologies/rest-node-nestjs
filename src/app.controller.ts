import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from '@libs/core';
import AppLogger from '@libs/core/logger/logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private appLogger: AppLogger) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    this.appLogger.log('API called');
    return res.success(this.appService.getHello());
  }
}
