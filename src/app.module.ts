import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CoreModule } from '@app/core/module';
import { DatabaseModule } from '@app/db/database.module';
import { UsersModule } from '@app/components/users/users.module';

import { ThrottleModule } from '@app/core/rate-limiter/throttle.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule, ThrottleModule, AuthModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
