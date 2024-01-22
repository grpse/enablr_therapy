import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import {
  CONFIG_RESPONSE,
  EBehaviorTherapyReasonsForVisit,
  ELocations,
  EMassageTherapyReasonsForVisit,
  EServices,
} from '@/common/config.availability';

@ObjectType()
class Service {
  @Field(() => String, { nullable: false })
  id!: EServices;

  @Field(() => String, { nullable: false })
  name!: string;
}

@ObjectType()
class ServiceByReason {
  @Field(() => String, { nullable: false })
  service!: EServices;

  @Field(() => String, { nullable: false })
  id!: EMassageTherapyReasonsForVisit | EBehaviorTherapyReasonsForVisit;

  @Field(() => String, { nullable: false })
  name!: string;
}

@ObjectType()
class Location {
  @Field(() => String, { nullable: false })
  id!: ELocations;

  @Field(() => String, { nullable: false })
  name!: string;
}

@ObjectType()
class TimeSlot {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  start!: Date;

  @Field(() => Date, { nullable: false })
  end!: Date;
}

@ObjectType()
export class Availability {
  @Field(() => [Service], {
    nullable: false,
    defaultValue: CONFIG_RESPONSE.services,
  })
  services!: Array<{
    id: EServices;
    name: string;
  }>;

  @Field(() => [ServiceByReason], {
    nullable: false,
    defaultValue: CONFIG_RESPONSE.reasonsByService as any,
  })
  reasonsByService!: {
    [key in EServices]: Array<ServiceByReason>;
  };

  @Field(() => [Location], {
    nullable: false,
    defaultValue: CONFIG_RESPONSE.locations,
  })
  locations!: Array<{
    id: ELocations;
    name: string;
  }>;

  @Field(() => [TimeSlot], {
    nullable: false,
    defaultValue: CONFIG_RESPONSE.calendar,
  })
  calendar!: Array<{ start: Date; end: Date; id: string }>;
}
