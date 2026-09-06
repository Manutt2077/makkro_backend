// controllers/routine.controller.js
const { createRoutine } = require('../../services/Routine/createRoutineService');

async function createRoutineController(req, res) {
  try {
    const userId = req.user.userId;
    console.log('userId desde token:', userId); 
    const { name, finish_day, is_public, days, exercises } = req.body;

    const routine = await createRoutine({ name, finish_day, is_public, userId, days,exercises });
    res.status(201).json(routine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la rutina' });
  }
}

module.exports = { createRoutineController };