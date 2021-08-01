import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { LoginDto } from './dto/LoginDto';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}

  @Mutation(() => Candidate)
  createCandidate(
    @Args('createCandidateInput') createCandidateInput: CreateCandidateInput,
  ) {
    return this.candidateService.create(createCandidateInput);
  }

  @Query(() => [Candidate], { name: 'Allcandidate' })
  findAll() {
    return this.candidateService.findAll();
  }

  @Mutation(() => Candidate)
  login(@Args('login') loginDto: LoginDto) {
    return this.candidateService.login(loginDto);
  }

  @Query(() => Candidate, { name: 'candidate' })
  findOne(@Args('id') id: string) {
    return this.candidateService.findOne(id);
  }

  @Mutation(() => Candidate)
  updateCandidate(
    @Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput,
  ) {
    return this.candidateService.update(
      updateCandidateInput.id,
      updateCandidateInput,
    );
  }

  @Mutation(() => Candidate)
  removeCandidate(@Args('id') id: string) {
    return this.candidateService.remove(id);
  }
}
