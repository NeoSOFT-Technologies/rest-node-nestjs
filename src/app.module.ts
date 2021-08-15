import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from '@libs/core/module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
