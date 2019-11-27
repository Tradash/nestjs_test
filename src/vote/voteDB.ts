import { Injectable } from '@nestjs/common';
import { IVoteDB } from '../interface/IVoteDB';
import { IVoteDtoResponse, VoteDto } from '../DTO/IVoteDto';
import { IResultDto, IResultDtoResponse } from '../DTO/result.dto';

interface ITmpVoteDB {
  [key: string]: IResultDtoResponse;
}

@Injectable()
export class VoteDB {
  private dataDB: IVoteDB[];
  constructor() {
    this.dataDB = [];
  }
  addVote(vote: VoteDto): IVoteDtoResponse {
    this.dataDB.push({ token: vote.token, voteFor: vote.payload });
    return { response: true };
  }
  getResult(token: IResultDto): IResultDtoResponse[] {
    const d1: IVoteDB[] = this.dataDB.filter(x => x.token === token.token);
    const d2: ITmpVoteDB = d1.reduce((acc, val) => {
      if (acc.hasOwnProperty(val.voteFor)) {
        acc[val.voteFor].votes++;
      } else {
        acc[val.voteFor] = {
          votes: 1,
          name: val.voteFor,
          position: 0,
        };
      }
      return acc;
    }, {});
    let i = 1;
    return Object.values(d2).sort((a, b) => {
      return b.votes - a.votes;
    }).map(x => {
      x.position = i;
      i++;
      return x;
    });
  }
}
