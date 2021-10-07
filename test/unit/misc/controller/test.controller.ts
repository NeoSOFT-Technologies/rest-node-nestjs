import { Request, Response } from '@app/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import AppLogger from '@app/core/logger/AppLogger';

@Controller()
export class TestController {
  constructor(private readonly appLogger: AppLogger) {}

  @Get('withMeta')
  testwithMeta(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.withMeta({
      data: 'mydata',
      myKey: 'myValue',
    });
  }
  @Get('noContent')
  testnoContent(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.noContent();
  }
  @Get('all/:param')
  testall(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.success(req.all());
  }
  @Get('logger')
  testAppLogger(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const logger = () => {
      this.appLogger.log('Log called');
      this.appLogger.error('Error called');
      this.appLogger.warn('Warn called');
      this.appLogger.debug('Debug called');
      this.appLogger.verbose('Verbose called');

      return 'AppLogger methods called succesfully';
    };

    return res.success(logger());
  }
}
