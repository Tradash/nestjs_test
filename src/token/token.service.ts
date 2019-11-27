import { Injectable } from '@nestjs/common';
import { IToken } from '../interface/IToken';
import { GetTokenDto } from '../DTO/i-get-token.dto';

@Injectable()
export class TokenService {
  private tokens: IToken[];
  constructor() {
    this.tokens = [];
  }
  getToken(data: GetTokenDto) {
    const newToken = `${data.payload}-${Math.floor(Math.random() * 10000001)}`;
    this.tokens.push({ payload: data.payload, token: newToken });
    return { response: newToken };
  }
  checkToken(token: string) {
    return this.tokens.some(x => x.token === token);
  }
}
