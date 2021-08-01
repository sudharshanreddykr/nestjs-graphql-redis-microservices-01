import { CreateCandidateInput } from './create-candidate.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCandidateInput extends PartialType(CreateCandidateInput) {
  @Field()
  id: string;
}
