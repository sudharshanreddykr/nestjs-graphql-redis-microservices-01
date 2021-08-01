import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCandidateInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  dateOfBirth: Date;
}
