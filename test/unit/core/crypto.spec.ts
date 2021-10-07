import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { decrypt, encrypt } from '@app/core/crypto/crypto';
import { AppModule } from '@app/app.module';

describe('Testing Encryption-Decryption', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing for text', () => {
    const config = app.get(ConfigService);
    const data = 'This data is to be encrypted';
    const encrypted = encrypt(config, data);
    const decrypted = decrypt(config, encrypted);
    expect(decrypted).toEqual(data);
  });

  it('Testing for array', () => {
    const config = app.get(ConfigService);
    const data = ['this', 'is', 'array'];
    const encrypted = encrypt(config, data);
    const decrypted = decrypt(config, encrypted);
    expect(decrypted).toEqual(data);
  });

  it('Testing for object', () => {
    const config = app.get(ConfigService);
    const data = {
      key1: 'value1',
      key2: 'value2',
    };
    const encrypted = encrypt(config, data);
    const decrypted = decrypt(config, encrypted);
    expect(decrypted).toEqual(data);
  });

  it('Testing catch block for encryption', () => {
    const config = app.get(ConfigService);
    const mockget = jest.spyOn(config, 'get');
    mockget.mockImplementation(() => {
      throw new Error('hehe');
    });
    const data = 'This data is to be encrypted';
    expect(() => encrypt(config, data)).toThrow();
    mockget.mockRestore();
  });

  it('Testing catch block for decryption', () => {
    const config = app.get(ConfigService);
    const data = 'This data is to be encrypted';
    const encrypted = encrypt(config, data);

    const mockget = jest.spyOn(config, 'get');
    mockget.mockImplementation(() => {
      throw new Error('hehe');
    });
    expect(() => decrypt(config, encrypted)).toThrow();
    mockget.mockRestore();
  });
});
