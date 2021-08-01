import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateResolver } from './candidate.resolver';
import { Candidate } from './entities/candidate.entity';
import { BullModule } from '@nestjs/bull';
import { CandidateConsumer } from './candidate.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        port: 6379,
      },
    }),
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [CandidateResolver, CandidateService, CandidateConsumer],
})
export class CandidateModule {}
