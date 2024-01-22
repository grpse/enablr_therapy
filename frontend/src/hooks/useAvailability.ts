import request, { gql, GraphQLClient } from "graphql-request";
import { TAvailabilityData } from "@/common/config.availability";
import { TBookingForm } from "@/components/booking-form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const client = new GraphQLClient('/api/graphql');

const queryAvailability = gql`
  {
    availability {
      services {
        id
        name
      }
      reasonsByService {
        service
        id
        name
      }
      locations {
        id
        name
      }
      calendar {
        id
        start
        end
      }
    }
  }
`;

const mutateBooking = gql`
  mutation BookTherapy($schedule: ScheduleCreateInput!) {
    bookSchedule(scheduleData: $schedule) {
      id
      service
      location
      seenProvider
      start
      end
    }
  }
`

export const useAvailability = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const result = useQuery<{ availability: TAvailabilityData }, Error, TAvailabilityData>({
    queryFn: () =>
      request("/api/graphql", queryAvailability),
    queryKey: ["availability"],
    select: (data) => ({
      ...data.availability,
      calendar: data.availability.calendar.map((slot) => ({
        ...slot,
        start: new Date(slot.start),
        end: new Date(slot.end),
      })),
    }),
  });

  const mutation = useMutation<{ bookSchedule: TBookingForm }, Error, TBookingForm>({
    mutationFn: ({ schedule, ...data}) => client.request(
      mutateBooking,
      {
        schedule: {
          ...data,
          start: schedule.start.toISOString(),
          end: schedule.end.toISOString(),
        },
      }
    ),
    mutationKey: ["booking"],
    onSuccess: ({ bookSchedule: data }) => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      toast({
        description: `Scheduled a ${data.service} on ${data.location}.`,
        title: "Success",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        title: "Error",
        variant: "destructive",
      });
    },
  });

  return {
    availability: result,
    book: mutation.mutate,
    sending: mutation.isPending,
  };
};
