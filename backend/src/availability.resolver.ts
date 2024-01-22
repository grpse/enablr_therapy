import { Resolver, Query } from '@nestjs/graphql';
import { Availability } from '@/models/availability.model';
import { CONFIG_RESPONSE } from '@/common/config.availability';
import { PrismaService } from './prisma.service';

@Resolver(() => Availability)
export class AvailabilityResolver {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * DOC: As we are using only the config to display availability,
   *      we can filter from what is already in the database
   *      by the date start of the scheduled session without the
   *      ms part.
   */
  @Query(() => Availability)
  async availability() {
    const schedules = await this.prisma.schedule.findMany();
    const scheduleByStart = schedules.reduce((scheduleMap, schedule) => {
      return {
        ...scheduleMap,
        [schedule.start.toISOString().split('.')[0]]: false,
      };
    }, {} as Record<string, boolean>);

    return {
      ...CONFIG_RESPONSE,
      calendar: CONFIG_RESPONSE.calendar.filter(
        (slot) => !(slot.start.toISOString().split('.')[0] in scheduleByStart),
      ),
    };
  }
}
