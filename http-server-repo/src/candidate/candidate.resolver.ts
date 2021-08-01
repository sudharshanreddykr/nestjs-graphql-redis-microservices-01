import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}
  private logger = new Logger('AppController');

  @Mutation(() => Candidate)
  createCandidate(
    @Args('createCandidateInput') createCandidateInput: CreateCandidateInput,
  ) {
    this.logger.log(createCandidateInput); // Log something on every call
    return this.candidateService.create(createCandidateInput);
  }

  @Query(() => [Candidate], { name: 'Allcandidate' })
  findAll() {
    return this.candidateService.findAll();
  }

  @Query(() => Candidate, { name: 'candidate' })
  findOne(@Args('id') id: string) {
    return this.candidateService.findOne(id);
  }

  @Mutation(() => Candidate)
  updateCandidate(
    @Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput,
  ) {
    this.logger.log(updateCandidateInput.id, updateCandidateInput);
    return this.candidateService.update(
      updateCandidateInput.id,
      updateCandidateInput,
    );
  }

  @Mutation(() => Candidate)
  removeCandidate(@Args('id') id: string) {
    this.logger.log(Candidate);
    return this.candidateService.remove(id);
  }
}
