import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@ObjectType()
@Entity()
export class Candidate {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field()
  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // hashed password
  }
}
