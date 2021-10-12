import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

    it('"app.version" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('app.version')).toBeDefined();
    });

    it('"app.apiVersioning" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('app.apiVersioning')).toBeDefined();
    });

    it('"app.apiVersioningHeader" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('app.apiVersioningHeader')).toBeDefined();
    });

    it('"app.apiVersioningKey" should be defined', async () => {
      const config = app.get(ConfigService);
      expect(config.get('app.apiVersioningKey')).toBeDefined();
    });
  });
});
