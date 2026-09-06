-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('COMPLETED', 'SKIPPED');

-- CreateTable
CREATE TABLE "session_exercise" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "dayId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "session_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set_log" (
    "id" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "repsDone" INTEGER,
    "weightDone" DOUBLE PRECISION,
    "restSeconds" INTEGER,
    "sessionExerciseId" TEXT NOT NULL,

    CONSTRAINT "set_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_session" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'COMPLETED',
    "duration" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "workout_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "set_log_sessionExerciseId_setNumber_key" ON "set_log"("sessionExerciseId", "setNumber");

-- CreateIndex
CREATE UNIQUE INDEX "workout_session_userId_date_key" ON "workout_session"("userId", "date");

-- AddForeignKey
ALTER TABLE "session_exercise" ADD CONSTRAINT "session_exercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "workout_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_exercise" ADD CONSTRAINT "session_exercise_routineId_dayId_exerciseId_fkey" FOREIGN KEY ("routineId", "dayId", "exerciseId") REFERENCES "routine_day_exercise"("routineId", "dayId", "exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set_log" ADD CONSTRAINT "set_log_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES "session_exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
