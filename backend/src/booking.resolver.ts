import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { Schedule } from './models/schedule.model';
import { ScheduleCreateInput } from './dto/schedule-create.input';

@Resolver(() => Schedule)
export class BookingResolver {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * DOC: Receive the scheduled values and create a new record
   */
  @Mutation(() => Schedule)
  async bookSchedule(
    @Args('scheduleData') scheduleData: ScheduleCreateInput,
  ): Promise<Schedule> {
    return this.prisma.schedule.create({ data: scheduleData });
  }

  @Query(() => [Schedule])
  async schedules(@Args('take') take: number): Promise<Array<Schedule>> {
    return this.prisma.schedule.findMany({
      take,
    });
  }
}
