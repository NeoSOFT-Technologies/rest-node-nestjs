import { Global, Module } from '@nestjs/common';
import { exportProvider, getProviders } from './providers';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [...getProviders()],
  exports: [...exportProvider()],
})
export class CoreModule {}
