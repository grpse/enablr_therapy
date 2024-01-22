import { Resolver, Query } from '@nestjs/graphql';
import { Availability } from '@/models/availability.model';
import { CONFIG_RESPONSE } from '@/common/config.availability';

@Resolver(() => Availability)
export class AvailabilityResolver {
  @Query(() => Availability)
  availability() {
    return CONFIG_RESPONSE;
  }
}
