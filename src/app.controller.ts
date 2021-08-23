import { Request, Response } from '@app/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import AppLogger from '@app/core/logger/AppLogger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly appLogger: AppLogger) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    this.appLogger.log('API called');
    return res.success(this.appService.getHello());
  }
}
