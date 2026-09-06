// prisma/updateRoutineExercises.js
const { prisma } = require('../../config/prismaClient');

async function updateSingleRoutineExercise({ routineId, dayId, exerciseId, reps, sets, rest, weight }) {
  return await prisma.$transaction(async (tx) => {
    

 
    const updated = await tx.routineDayExercise.updateMany({
      where: {
        routineId,
        dayId,
        exerciseId
      },
      data: {
        reps,
        sets,
        rest: rest,
        weight: weight 
      }
    });

    if (updated.count === 0) {
      throw new Error(
        `No se encontró la relación para rutina ${routineId}, día "${dayName}", ejercicio ${exerciseId}`
      );
    }

    return { success: true, message: 'Ejercicio actualizado correctamente' };
  });
}


module.exports = { updateSingleRoutineExercise };
