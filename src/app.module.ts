import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@app/core/module';
import { DatabaseModule } from '@app/db/database.module';
import { UsersModule } from '@app/components/users/users.module';

import { ThrottleModule } from './core/rate limiter/throttle.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule, ThrottleModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
