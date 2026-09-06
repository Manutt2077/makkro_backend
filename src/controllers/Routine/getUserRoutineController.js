const { getUserRoutines } = require('../../services/Routine/getUserRoutineService');

async function getUserRoutinesController(req, res) {
  try {
    const userId = req.user.userId; 

    const routines = await getUserRoutines(userId);

    if (!routines.length) {
      return res.status(404).json({ message: 'No se encontraron rutinas para este usuario' });
    }

    res.status(200).json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las rutinas del usuario' });
  }
}

module.exports = { getUserRoutinesController };
