import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@app/core/module';
import { DatabaseModule } from '@app/db/database.module';
import { UsersModule } from '@app/components/users/users.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
