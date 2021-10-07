import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@app/config/index';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/test/unit/misc/config/test.env`],
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
})
export class TestCoreModule {}
