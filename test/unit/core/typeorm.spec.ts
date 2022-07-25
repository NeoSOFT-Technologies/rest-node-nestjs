import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, createConnection } from 'typeorm';

import { CoreModule } from '@app/core/module';
import { User } from '@app/feature/users/entities/user.entity';

describe('Testing Typeorm connection', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Testing mysql connection', async () => {
    const config = app.get(ConfigService);
    const connection: Connection = await createConnection({
      type: 'mysql',
      host: config.get('db.host'),
      port: config.get('db.port'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      database: config.get('db.database'),
      entities: [User],
      synchronize: true,
    });
    expect(connection).toBeDefined();
    await connection.close();
  });
});
