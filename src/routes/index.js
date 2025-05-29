const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes); // Ahora puedes usar /users/register

module.exports = router;
