import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestCoreModule } from '../core/guards/module/core-test.module';

describe('Testing config variables default values', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestCoreModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Testing "database.ts"', () => {
    it('"db.host" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('db.host')).toBeDefined();
    });
    it('"db.port" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('db.port')).toBeDefined();
    });

    it('"db.username" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('db.username')).toBeDefined();
    });

    it('"db.password" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('db.password')).toBeDefined();
    });

    it('"db.database" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('db.database')).toBeDefined();
    });
  });
});
