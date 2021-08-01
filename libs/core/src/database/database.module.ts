import { databaseConnections } from './database-connections';
import { Module } from '@nestjs/common';

@Module({
  imports: [...databaseConnections],
})
export class DatabaseModule {}
