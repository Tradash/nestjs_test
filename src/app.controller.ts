import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { GetTokenDto, IGetTokenDtoResponse } from './DTO/i-get-token.dto';
import { VoteDB } from './vote/voteDB';
import { IVoteDtoResponse, VoteDto } from './DTO/IVoteDto';
import { IResultDtoResponse } from './DTO/result.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly voteSevice: VoteDB,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/get-token')
  getToken(@Body() data: GetTokenDto): IGetTokenDtoResponse {
    return this.authService.getToken(data);
  }
  @UseGuards(AuthService)
  @Post('/test')
  test() {
    return 'Прошел';
  }
  @UseGuards(AuthService)
  @Post('/vote')
  vote(
    @Body() payload: VoteDto,
    @Headers('x-access-token') token: string,
  ): IVoteDtoResponse {
    return this.voteSevice.addVote({ token, payload: payload.payload });
  }
  @UseGuards(AuthService)
  @Get('/results')
  getResults(@Headers('x-access-token') token: string): IResultDtoResponse[] {
    return this.voteSevice.getResult({ token });
  }
}
