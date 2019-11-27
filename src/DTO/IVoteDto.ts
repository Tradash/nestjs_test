import { IsNotEmpty, IsString } from 'class-validator';

export class VoteDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  readonly payload: string;
}

export interface IVoteDtoResponse {
  response: boolean;
}
