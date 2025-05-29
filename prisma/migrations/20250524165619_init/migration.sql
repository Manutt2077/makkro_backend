/*
  Warnings:

  - You are about to drop the `days` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "days" DROP CONSTRAINT "days_routineId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_muscleName_fkey";

-- DropForeignKey
ALTER TABLE "routine_day_exercise" DROP CONSTRAINT "routine_day_exercise_dayId_fkey";

-- DropForeignKey
ALTER TABLE "routine_day_exercise" DROP CONSTRAINT "routine_day_exercise_exerciseId_fkey";

-- DropTable
DROP TABLE "days";

-- DropTable
DROP TABLE "exercises";

-- CreateTable
CREATE TABLE "day" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,

    CONSTRAINT "day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "ex_img" TEXT,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "difficult" TEXT NOT NULL,
    "ex_vid" TEXT,
    "muscleName" TEXT NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "day" ADD CONSTRAINT "day_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_muscleName_fkey" FOREIGN KEY ("muscleName") REFERENCES "muscle"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_day_exercise" ADD CONSTRAINT "routine_day_exercise_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_day_exercise" ADD CONSTRAINT "routine_day_exercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
