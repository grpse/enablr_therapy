-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "seenProvider" BOOLEAN NOT NULL DEFAULT false,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);
