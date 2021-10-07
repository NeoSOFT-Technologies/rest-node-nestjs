import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestCoreModule } from '../misc/module/core-test.module';

describe('Testing config variables default values', () => {
  let testConfig: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestCoreModule],
    }).compile();

    testConfig = moduleFixture.createNestApplication();
    await testConfig.init();
  });

  afterAll(async () => {
    await testConfig.close();
  });

  describe('Testing "app.ts"', () => {
    it('"app.name" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('app.name')).toBeDefined();
    });
    it('"app.version" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('app.version')).toBeDefined();
    });
    it('"app.apiVersioning" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('app.apiVersioning')).toBeDefined();
    });
    it('"app.apiVersioningHeader" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('app.apiVersioningHeader')).toBeDefined();
    });
    it('"app.apiVersioningKey" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('app.apiVersioningKey')).toBeDefined();
    });
  });

  describe('Testing "database.ts"', () => {
    it('"db.host" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('db.host')).toBeDefined();
    });
    it('"db.port" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('db.port')).toBeDefined();
    });
    it('"db.username" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('db.username')).toBeDefined();
    });
    it('"db.password" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('db.password')).toBeDefined();
    });
    it('"db.database" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('db.database')).toBeDefined();
    });
  });

  describe('Testing "crypto.ts"', () => {
    it('"crypto.secretKey" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('crypto.secretKey')).toBeDefined();
    });
    it('"crypto.iv" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('crypto.iv')).toBeDefined();
    });
  });

  describe('Testing "throttler.ts"', () => {
    it('"throttler.ttl" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('throttler.ttl')).toBeDefined();
    });
    it('"throttler.limit" should be defined', async () => {
      const config = testConfig.get(ConfigService);
      expect(config.get('throttler.limit')).toBeDefined();
    });
  });
});
