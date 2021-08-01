import { dbConfig } from '@app/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseConnections = [TypeOrmModule.forRoot(dbConfig)];
