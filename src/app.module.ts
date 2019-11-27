import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VoteDBModule } from './vote/voteDB.module';
// import { TokenService } from '../token/token.service';

@Module({
  imports: [AuthModule, VoteDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
