import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { Schedule } from './models/schedule.model';
import { ScheduleCreateInput } from './dto/schedule-create.input';

@Resolver(() => Schedule)
export class BookingResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Schedule)
  async bookSchedule(
    @Args('scheduleData') scheduleData: ScheduleCreateInput,
  ): Promise<Schedule> {
    return this.prisma.schedule.create({ data: scheduleData });
  }
}
