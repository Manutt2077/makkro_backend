const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const routineRoutes = require('./routineRoutes');
const equipmentRoutes = require('./equipmentRoutes');

router.use('/users', userRoutes); 

router.use('/routines', routineRoutes); 

router.use('/equipment', equipmentRoutes); 

module.exports = router;
