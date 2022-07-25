import { Module } from '@nestjs/common';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthModule } from '@app/core/auth/auth.module';
import { DatabaseModule } from '@app/core/db/database.module';
import { CoreModule } from '@app/core/module';
import { UsersModule } from '@app/feature/users/users.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
