/*
  Warnings:

  - You are about to drop the column `muscleName` on the `exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_muscleName_fkey";

-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "muscleName";

-- CreateTable
CREATE TABLE "exercise_muscle" (
    "exerciseId" INTEGER NOT NULL,
    "muscleName" TEXT NOT NULL,

    CONSTRAINT "exercise_muscle_pkey" PRIMARY KEY ("exerciseId","muscleName")
);

-- AddForeignKey
ALTER TABLE "exercise_muscle" ADD CONSTRAINT "exercise_muscle_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_muscle" ADD CONSTRAINT "exercise_muscle_muscleName_fkey" FOREIGN KEY ("muscleName") REFERENCES "muscle"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
