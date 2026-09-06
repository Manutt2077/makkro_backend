//añadir ejercicio a rutina
const { prisma } = require("../../config/prismaClient");

async function addExerciseToRoutine({
  routineId,
  dayId,
  exerciseId,
  reps,
  sets,
  rest,
  weight,
}) {
  return await prisma.$transaction(async (tx) => {
    // Verificar si la rutina existe
    const routine = await tx.routine.findUnique({
      where: { id: routineId },
    });

    if (!routine) {
      throw new Error(`Rutina con ID ${routineId} no encontrada`);
    }

    
    const day = await tx.day.findUnique({
      where: { id: dayId },
    });

    if (!day) {
      throw new Error(`Día con ID ${dayId} no encontrado`);
    }

    
    const exercise = await tx.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new Error(`Ejercicio con ID ${exerciseId} no encontrado`);
    }

   
    const routineDayExercise = await tx.routineDayExercise.create({
      data: {
        routineId,
        dayId,
        exerciseId,
        reps,
        sets,
        rest: rest || 0,
        weight: weight || 0,
      },
    });

    return routineDayExercise;
  });
}

module.exports = { addExerciseToRoutine };
