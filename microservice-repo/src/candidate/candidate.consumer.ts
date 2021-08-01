import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification')
export class CandidateConsumer {
  @Process('create')
  createJob(job: Job<unknown>) {
    console.log('createCandidate', job.data);
  }
}
