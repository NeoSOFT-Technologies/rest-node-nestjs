import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TestCoreModule } from '@test/unit/core/guards/module/core-test.module';

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

  describe('Testing "app.ts"', () => {
    it('"app.name" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('app.name')).toBeDefined();
    });
  });
});
