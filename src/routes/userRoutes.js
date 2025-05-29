const express = require('express');
const router = express.Router();

// Importar controladores
const { registerUser } = require('../controllers/User/registerController');
const { loginUser } = require('../controllers/User/loginController');
const { updateUser } = require('../controllers/User/updateController');
// Middleware de validación
const validateRegister = require('../middleware/User/registerMiddleware');
const authMiddleware = require('../middleware/User/authMiddleware');

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.patch('/profile/update', authMiddleware, updateUser);

module.exports = router;
