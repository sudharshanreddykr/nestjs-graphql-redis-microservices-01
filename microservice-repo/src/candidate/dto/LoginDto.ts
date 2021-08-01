import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
