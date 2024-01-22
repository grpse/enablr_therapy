"use client";

import React, { FC, useEffect } from "react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import WeekCalendar from "@/components/booking-form/week-calendar";
import RadioGroupOptions from "@/components/design-system/radio-group-options";
import Building from "@/components/design-system/icons/building";
import House from "@/components/design-system/icons/house";
import Video from "@/components/design-system/icons/video";
import SelectList from "@/components/design-system/select-list";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "../design-system/icons/checkbox";
import { TAvailabilityData, EServices, ELocations } from "@/common/config.availability";

const getColor = (checked: boolean) => {
  if (checked) {
    return "#48BB78";
  } else {
    return "#D5DBE0";
  }
};

const bookingFormSchema = z.object({
  service: z.string(),
  reason: z.string(),
  location: z.string(),
  seenProvider: z.boolean().optional(),
  schedule: z.object({
    id: z.string(),
    start: z.date(),
    end: z.date(),
  }),
});

export type TBookingForm = z.infer<typeof bookingFormSchema>;

/**
 * The booking form here was used to receive the values loaded outside
 * so it can be more independent from how it is querying and mutating
 * the data.
 */
const BookingForm: FC<TAvailabilityData & {
  onBook: (data: TBookingForm) => void;
}> = ({ services, reasonsByService, locations, calendar, onBook }) => {
  const form = useForm<TBookingForm>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: services?.[0].id,
    },
  });

  const serviceValue = form.watch("service") as EServices;
  const reasonsForVisit = reasonsByService.filter((reason) => reason.service === serviceValue);

  return (
    <div className="bg-body border-[1px] shadow-custom p-8 rounded-xl w-[646px] h-auto">
      <h2 className="mb-8 leading-10 text-2-5xl font-bold">Book appointment</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onBook)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <RadioGroupOptions
                field={field}
                label="What service do you need?"
                options={services.map((service) => ({
                  label: service.name,
                  value: service.id,
                  icon: (checked) => (
                    <Checkbox color={getColor(checked)} checked={checked} />
                  ),
                }))}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <SelectList
                field={field}
                label="What's the reason(s) for your visit?"
                options={reasonsForVisit.map((reason) => ({
                  label: reason.name,
                  value: reason.id,
                }))}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <RadioGroupOptions
                field={field}
                label="Where do you want to meet service provider?"
                options={locations.map((location) => ({
                  value: location.id,
                  label: location.name,
                  icon: (checked) => {
                    switch (location.id) {
                      case ELocations.ON_PROVIDER_LOCATION:
                        return <Building color={getColor(checked)} />;
                      case ELocations.ON_MY_LOCATION:
                        return <House color={getColor(checked)} />;
                      case ELocations.ON_VIDEO_CALL:
                        return <Video color={getColor(checked)} />;
                      default:
                        return null;
                    }
                  },
                }))}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name="seenProvider"
            render={({ field }) => (
              <RadioGroupOptions
                field={field}
                label="Did you see this provider before?"
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
              />
            )}
          />
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <WeekCalendar
                calendar={calendar}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary-foreground text-white font-bold py-2 px-4 rounded"
          >
            Continue Booking
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
