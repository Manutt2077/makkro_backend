
const { prisma } = require('../../config/prismaClient');

async function createRoutine({ name, finish_day, is_public, userId, days, exercises }) {
  return await prisma.$transaction(async (tx) => {
  
    const routine = await tx.routine.create({
      data: {
        name,
        finish_day,
        is_public,
        userId
      }
    });

    for (const day of days) {
      const existingDay = await tx.day.findUnique({
        where: { name: day.name }
      });

      if (!existingDay) {
        throw new Error(`El día "${day.name}" no existe en la base de datos`);
      }

      for (const ex of day.exercises) {
        const exerciseData = exercises.find(e => e.name === ex.name);
        if (!exerciseData) {
          throw new Error(`Ejercicio "${ex.name}" no encontrado en la lista de ejercicios`);
        }

        await tx.routineDayExercise.create({
          data: {
            routineId: routine.id,
            dayId: existingDay.id,
            exerciseId: exerciseData.id, 
            reps: ex.reps,
            sets: ex.sets,
            rest: ex.rest || 0,
            weight: ex.weight || 0
          }
        });
      }
    }

    return routine;
  });
}

module.exports = { createRoutine };