"use client";

import BookingForm from "@/components/booking-form";
import { Toaster } from "@/components/ui/toaster";
import { useAvailability } from "@/hooks/useAvailability";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const BookingWrapper = () => {

  const { availability: { isLoading, data }, book, sending } = useAvailability();

  if (!(data?.calendar && data?.locations && data?.services && data?.reasonsByService)) {
    return <div>No data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (sending) {
    return <div>Sending...</div>
  }

  return <BookingForm onBook={book} {...data} />;
};

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
        <BookingWrapper />
      </QueryClientProvider>
      <Toaster />
    </main>
  );
}
