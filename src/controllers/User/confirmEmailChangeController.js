const jwt = require('jsonwebtoken');
const { confirmEmailChange } = require('../../services/User/confirmEmailChangeService');

const JWT_SECRET = process.env.JWT_SECRET;

const confirmEmailChangeController = async (req, res, next) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, newEmail } = decoded;

    const result = await confirmEmailChange(userId, newEmail);
    res.json(result);
  } catch (error) {
    error.statusCode = 400;
    error.message = 'Token inválido o expirado';
    next(error);
  }
};

module.exports = { confirmEmailChangeController };
