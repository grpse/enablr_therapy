"use client";

import { translateMatrix, cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { FC, FormEvent, useState } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import z from "zod";
import ChevronRight from "../design-system/icons/chevron-right";
import ChevronLeft from "../design-system/icons/chevron-left";

const isoStringScheme = z.string().datetime();
type TISOString = z.infer<typeof isoStringScheme>;
type TimeSlot = {
  id: string;
  available?: boolean;
  start: TISOString;
  end: TISOString;
};
type TTimeSlot = Record<string, TimeSlot[]>;

let emptySlotId = 1;

const getEmptySlots = (length: number): Array<TimeSlot> =>
  Array.from({ length }).map(() => ({
    id: String(emptySlotId++),
    available: false,
    start: "-",
    end: "-",
  }));

const format12Hour = (datetime: TISOString) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(datetime));

const formatYearMonthDay = (datetime: TISOString) => {
  isoStringScheme.parse(datetime);
  return datetime.split("T")[0];
};

const formatDayNumber = (datetime: TISOString) => {
  isoStringScheme.parse(datetime);
  return datetime.split("T")[0].split("-")[2];
};

const formatDayShort = (datetime: TISOString) => {
  isoStringScheme.parse(datetime);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(new Date(datetime));
};

export type TAvailability = {
  available?: boolean;
  id: string;
  start: Date;
  end: Date;
};

const Row: FC<{ columns: Array<TimeSlot>; currentSelectedId?: string }> = ({
  columns,
  currentSelectedId,
}) => (
  <TableRow className="flex flex-row gap-2 justify-evenly content-center items-center h-full">
    <TableCell className="p-0 w-8 h-8" />
    {columns.map(({ id, start, end, available }, slotIndex) => (
      <TableCell
        key={id}
        className={cn(
          "p-0 flex flex-col justify-center content-center items-center border-[1px] border-primary min-h-8 w-20 h-8 text-sm leading-4 font-normal ",
          {
            "bg-primary": available,
            "bg-primary-foreground": currentSelectedId === id,
            "text-white": currentSelectedId === id,
            "border-primary": !available,
          }
        )}
      >
        <FormItem className="m-0 p-0 text-[16px] leading-4">
          {available && (
            <FormControl>
              <RadioGroupItem value={id} className="hidden" />
            </FormControl>
          )}
          <FormLabel
            className={cn(
              "mt-0 flex flex-col justify-center content-center items-center min-h-8 w-20 h-8",
              {
                "hover:cursor-pointer": available,
              }
            )}
          >
            {available ? format12Hour(start) : "-"}
          </FormLabel>
        </FormItem>
      </TableCell>
    ))}
    <TableCell className="p-0 w-8 h-8" />
  </TableRow>
);

const convertAvailabilityToSlots = (availability: Array<TAvailability>) => {
  return availability.reduce((availabilityMap, slot) => {
    const [yearMonthDayStr] = slot.start.toISOString().split("T");
    return {
      ...availabilityMap,
      [yearMonthDayStr]: [
        ...(availabilityMap[yearMonthDayStr] || []),
        {
          id: slot.id,
          available: true,
          end: slot.end.toISOString(),
          start: slot.start.toISOString(),
        },
      ],
    };
  }, {} as Record<TISOString, Array<TimeSlot>>);
};

const getTimeSlotsForDay = (timeSlots: TTimeSlot,date: TISOString, maxSlotsOfTheWeek: number) => {
  const dateString = formatYearMonthDay(date);
  const slotsOfTheDay: Array<TimeSlot & { available?: boolean }> =
    timeSlots[dateString]?.map((slot) => ({ ...slot, available: true })) ||
    [];
  const amountOfSlotsForTheDay = slotsOfTheDay.length || 0;
  return amountOfSlotsForTheDay < maxSlotsOfTheWeek
    ? slotsOfTheDay.concat(
        getEmptySlots(maxSlotsOfTheWeek - slotsOfTheDay.length)
      )
    : slotsOfTheDay;
};

const WeekCalendar: FC<{
  calendar: Array<TAvailability>;
  value?: TAvailability;
  onChange: (date?: TAvailability) => void;
  defaultValue?: TAvailability;
}> = ({ calendar, value, onChange, defaultValue }) => {
  const [startDate, setStartDate] = useState(new Date());
  const now = new Date();
  const startDateBeforeNow = startDate.getTime() <= now.getTime();
  // Use internal data structure to manipulate the dates using ISO strings and display as days of the week
  const timeSlots = convertAvailabilityToSlots(
    calendar.filter(({ start }) => start.getTime() > now.getTime())
  );
  const currentSelectedId = value?.id;

  const nextWeek = () => {
    setStartDate(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      )
    );
  };

  const previousWeek = () => {
    setStartDate(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() - 1
      )
    );
  };

  const daysInWeek = Array.from({ length: 5 }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date.toISOString();
  });

  const maxSlotsOfTheWeek = daysInWeek.reduce((memoMax, date) => {
    const dateString = formatYearMonthDay(date);
    const slotsOfTheDay = timeSlots[dateString] || [];
    return slotsOfTheDay.length > memoMax ? slotsOfTheDay.length : memoMax;
  }, 5);


  const quadrant = daysInWeek.map((day) =>
    getTimeSlotsForDay(timeSlots, day, maxSlotsOfTheWeek)
  );

  const rows = translateMatrix(quadrant);

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>Select an available time</FormLabel>
      <FormControl className="border-[1px] rounded bg-white ">
        <RadioGroup
          className="flex flex-row flex-nowrap justify-center items-center w-auto"
          onChange={(
            event: { target: { value: string } } & FormEvent<HTMLDivElement>
          ) => {
            const newSelectedId = event.target.value;
            if (newSelectedId !== currentSelectedId) {
              const foundAvailability = calendar.find(
                (schedule) => schedule.id === newSelectedId
              );
              onChange(foundAvailability);
            }
          }}
          defaultValue={defaultValue?.id}
        >
          <Table className="flex flex-col mb-4 mt-6 mx-6 gap-5 border-0">
            <TableHeader>
              <TableRow className="b-bo flex flex-row gap-2 justify-evenly content-center items-center h-14 w-full">
                <TableHead className="p-0 m-0 flex justify-center content-center items-center">
                  <button
                    onClick={previousWeek}
                    className={cn(
                      "w-8 h-8 flex justify-center content-center items-center",
                      {
                        "opacity-25": startDateBeforeNow,
                      }
                    )}
                    disabled={startDateBeforeNow}
                  >
                    <ChevronLeft color="#D5DBE0"/>
                  </button>
                </TableHead>
                {daysInWeek.map((day, dayIndex) => (
                  <TableHead
                    key={dayIndex}
                    className="p-0 m-0 flex flex-col gap-2 justify-center content-center items-center w-20 h-14"
                  >
                    <div className="w-8 h-8 flex justify-center content-center items-center bg-body border-[1px] rounded-full font-semibold text-base leading-6 align-middle">
                      {formatDayNumber(day)}
                    </div>
                    <div className="text-week-day-color text-sm leading-4">
                      {formatDayShort(day)}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="p-0 m-0 flex justify-center content-center items-center">
                  <button
                    onClick={nextWeek}
                    className="w-8 h-8 flex justify-center content-center items-center"
                  >
                    <ChevronRight color="#D5DBE0" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="flex flex-col gap-2 justify-start">
              {rows.map((columns, rowIndex) => (
                <Row
                  key={rowIndex}
                  columns={columns}
                  currentSelectedId={currentSelectedId}
                />
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default WeekCalendar;
