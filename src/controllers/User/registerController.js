const userService = require('../../services/User/registerService');

const registerUser = async (req, res) => {
  try {
    await userService.register(req.body);
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || 'Error interno del servidor' });
  }
};

module.exports = { registerUser };
