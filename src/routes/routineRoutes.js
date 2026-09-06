//ruta de rutinas

const express = require('express');
const router = express.Router();

const { createRoutineController } = require('../controllers/Routine/createRoutineController');
const { getUserRoutinesController } = require('../controllers/Routine/getUserRoutineController');
const { updateRoutineExerciseController } = require('../controllers/Routine/updateExerciseRoutineController');
const {addExerciseToRoutineController} = require('../controllers/Routine/addExerciseRoutineController');



const authMiddleware = require('../middleware/User/authMiddleware');


router.post('/create', authMiddleware, createRoutineController);

router.get('/user/routines', authMiddleware, getUserRoutinesController);

router.patch('/update/:routineId/day/:dayId/exercise/:exerciseId', authMiddleware, updateRoutineExerciseController);

router.post('/add/exercise', authMiddleware, addExerciseToRoutineController);

module.exports = router;




