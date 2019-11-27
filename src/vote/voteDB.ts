import { Injectable } from '@nestjs/common';
import { IVoteDB } from '../interface/IVoteDB';
import { IVoteDtoResponse, VoteDto } from '../DTO/IVoteDto';
import { IResultDto, IResultDtoResponse } from '../DTO/result.dto';

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
    // console.log(this.dataDB);
    const d1: any = this.dataDB.filter(x => x.token === token.token);
    const d2: any = d1.reduce((acc, val) => {
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
    const d3: any = Object.values(d2);
    const d4: any = d3.sort((a, b) => {
      return b.votes - a.votes;
    });
    let i = 1;
    const d5 = d4.map(x => {
      x.position = i;
      i++;
      return x;
    });
    return d5;
    // const data: any = this.dataDB
    //   .filter(x => x.token === token.token)
    //   .reduce((acc, val) => {
    //     if (acc.hasOwnProperty(val.voteFor)) {
    //       acc[val.voteFor].votes++;
    //     } else {
    //       acc[val.voteFor] = {
    //         votes: 1,
    //         name: val.voteFor,
    //         position: 0,
    //       };
    //     }
    //     return acc;
    //   }, {});
    //
    // return Object.values(data)
    //   .sort((a, b) => a.votes - b.votes)
    //   .map(x => {
    //     x.position = i;
    //     i++;
    //     return x;
    //   });
  }
}
