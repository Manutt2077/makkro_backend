const { addExerciseToRoutine } = require('../../services/Routine/addExerciseRoutineService');
const { prisma } = require('../../config/prismaClient');

async function addExerciseToRoutineController(req, res) {
  try {
    const userId = req.user.userId; 

    const { routineId, dayId, exerciseId, reps, sets, rest, weight } = req.body;
    // Validar que la rutina pertenece al usuario
    const routine = await prisma.routine.findUnique({
      where: { id: routineId },
      select: { userId: true }
    });

    if (!routine) {
      return res.status(404).json({ error: 'Rutina no encontrada' });
    }
    

    if (routine.userId !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta rutina' });
    }

    const routineDayExercise = await addExerciseToRoutine({
      routineId,
      dayId,
      exerciseId,
      reps,
      sets,
      rest,
      weight
    });

    res.status(201).json({
      message: 'Ejercicio añadido a la rutina exitosamente',
      data: routineDayExercise
    });
  } catch (error) {
    console.error('Error al añadir ejercicio a la rutina:', error.message);
    res.status(400).json({
      error: error.message
    });
  }
}

module.exports = {
  addExerciseToRoutineController
};
