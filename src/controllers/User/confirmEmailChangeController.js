const jwt = require('jsonwebtoken');
const { confirmEmailChange } = require('../../services/User/confirmEmailChangeService');

const JWT_SECRET = process.env.JWT_SECRET;

const confirmEmailChangeController = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      const error = new Error('Token no proporcionado');
      error.statusCode = 400;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, newEmail } = decoded;

    const result = await confirmEmailChange(userId, newEmail);

    res.json(result);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.message = 'El enlace ha expirado';
      error.statusCode = 401;
    } else if (error.name === 'JsonWebTokenError') {
      error.message = 'Token inválido';
      error.statusCode = 400;
    }
    next(error);
  }
};

module.exports = { confirmEmailChangeController };
