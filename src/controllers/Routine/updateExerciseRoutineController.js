const { updateSingleRoutineExercise } = require('../../services/Routine/updateExerciseRoutineService');

async function updateRoutineExerciseController(req, res) {
  try {
    const { routineId, dayId, exerciseId } = req.params;
    const { reps, sets, rest, weight } = req.body;

    const result = await updateSingleRoutineExercise({
      routineId: routineId,
      dayId: Number(dayId),
      exerciseId: Number(exerciseId),
      reps,
      sets,
      rest,
      weight
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el ejercicio de la rutina' });
  }
}

module.exports = { updateRoutineExerciseController };
