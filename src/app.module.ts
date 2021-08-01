import { Module } from '@nestjs/common';

import { CoreModule } from '@libs/core/module';
import { DatabaseModule } from '@libs/core/database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CoreModule, DatabaseModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
