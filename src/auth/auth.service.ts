import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { GetTokenDto, IGetTokenDtoResponse } from '../DTO/i-get-token.dto';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  validateReq(token: string) {
    return this.tokenService.checkToken(token);
  }

  canActivate(context: ExecutionContext): boolean {
    return this.validateReq(context.switchToHttp().getRequest().headers['x-access-token']);
  }
  getToken(payload: GetTokenDto): IGetTokenDtoResponse  {
    return this.tokenService.getToken(payload);
  }
}
