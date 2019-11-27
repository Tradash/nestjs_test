import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TokenService],
  providers: [AuthService, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
