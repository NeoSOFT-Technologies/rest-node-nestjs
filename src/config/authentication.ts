import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.SECRET_JWT_KEY || 'secretKey123456',
  jwtTokenForTest:
    process.env.JWT_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.U2FudG9zaDE.OJXhSkvY3NKSxPSLtzmkrAnqIXeMzUTx8Sy5ADMggBo',
}));
