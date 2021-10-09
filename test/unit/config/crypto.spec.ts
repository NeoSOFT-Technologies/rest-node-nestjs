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

  describe('Testing "crypto.ts"', () => {
    it('"crypto.secretKey" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('crypto.secretKey')).toBeDefined();
    });

    it('"crypto.iv" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('crypto.iv')).toBeDefined();
    });
  });
});
