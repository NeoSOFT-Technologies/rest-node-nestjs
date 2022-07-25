import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@app/core/auth/auth.controller';
import { AuthService } from '@app/core/auth/auth.service';
import { JwtStrategy } from '@app/core/auth/jwt.strategy';
import { UsersService } from '@app/feature/users/services/users.service';
import { UsersModule } from '@app/feature/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('SECRET_JWT_KEY'),
          signOptions: {
            expiresIn: config.get('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
  // exports:[AuthService]
})
export class AuthModule {}
