import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';
import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';

describe('Testing HTTPS Support', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const httpsOptions = {
      key: fs.readFileSync(`${__dirname}/../../src/${process.env.SSL_KEY_PATH || ''}`),
      cert: fs.readFileSync(`${__dirname}/../../src/${process.env.SSL_CERT_PATH || ''}`),
      passphrase: process.env.SSL_PASS_PHRASE || '',
    };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    app = moduleFixture.createNestApplication(null, { httpsOptions });
    coreBootstrap(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('URL should contain "https" when httpsOptions is provided', async () => {
    const response = await request(app.getHttpServer()).get('');
    expect(JSON.parse(JSON.stringify(response)).req.url).toContain('https');

    expect(response.body.code).toEqual(StatusCodes.OK);
    expect(response.body.data).toEqual('Hello World!');
  });
});
