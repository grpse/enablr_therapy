import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class Schedule {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  service!: string;

  @Field(() => String, { nullable: false })
  reason!: string;

  @Field(() => String, { nullable: false })
  location!: string;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  seenProvider!: boolean;

  @Field(() => Date, { nullable: false })
  start!: Date;

  @Field(() => Date, { nullable: false })
  end!: Date;
}
