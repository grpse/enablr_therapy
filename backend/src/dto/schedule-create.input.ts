import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ScheduleCreateInput {
  @Field(() => String, { nullable: false })
  service!: string;

  @Field(() => String, { nullable: false })
  reason!: string;

  @Field(() => String, { nullable: false })
  location!: string;

  @Field(() => Boolean, { nullable: true })
  seenProvider?: boolean;

  @Field(() => Date, { nullable: false })
  start!: Date | string;

  @Field(() => Date, { nullable: false })
  end!: Date | string;
}
