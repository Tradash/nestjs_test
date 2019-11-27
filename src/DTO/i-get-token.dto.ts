import { IsNotEmpty, IsString } from 'class-validator';

export class GetTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly payload: string;
}

export interface IGetTokenDtoResponse {
  response: string;
}
