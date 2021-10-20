import { Module } from '@nestjs/common';
import { EmailHandlerService } from './mailer.service';

@Module({
  providers: [EmailHandlerService],
  exports: [EmailHandlerService],
})
export class EmailHandlerModule {}
