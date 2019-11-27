import { Module } from '@nestjs/common';
import { VoteDB } from './voteDB';

@Module({
  imports: [VoteDB],
  providers: [VoteDB],
  exports: [VoteDB],
})
export class VoteDBModule {}
