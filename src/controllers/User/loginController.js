const { validateLogin } = require('../../validators/User/loginValidator');
const loginService = require('../../services/User/loginService');

const loginUser = async (req, res) => {
  const validationError = validateLogin(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const data = await loginService.login(req.body);
    res.status(200).json(data);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || 'Error interno del servidor' });
  }
};

module.exports = { loginUser };
