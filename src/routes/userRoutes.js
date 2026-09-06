const express = require('express');
const router = express.Router();


const { registerUser } = require('../controllers/User/registerController');
const { loginUser } = require('../controllers/User/loginController');
const { updateUser } = require('../controllers/User/updateController');
const { requestEmailChangeController } = require('../controllers/User/emailChangeController');
const { confirmEmailChangeController } = require('../controllers/User/confirmEmailChangeController');

const { updatePasswordController } = require('../controllers/User/updatePasswordController');


const validateRegister = require('../middleware/User/registerMiddleware');
const authMiddleware = require('../middleware/User/authMiddleware');

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.patch('/profile/update', authMiddleware, updateUser);


router.post('/profile/email/change',authMiddleware, requestEmailChangeController)


router.get('/profile/email/confirm', confirmEmailChangeController);

router.patch('/profile/password/update', authMiddleware, updatePasswordController);

module.exports = router;
