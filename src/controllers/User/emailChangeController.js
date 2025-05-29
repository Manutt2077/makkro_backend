const { validateNewEmail } = require('../../validators/User/updateEmailValidator');
const { requestEmailChange } = require('../../services/User/emailChangerService');
/**
 * Controlador para solicitar el cambio de correo electrónico del usuario.
 *
 * @param {Object} req - Request object que contiene el nuevo correo electrónico.
 * @param {Object} res - Response object para enviar la respuesta al cliente.
 * @param {Function} next - Función para pasar al siguiente middleware en caso de error.
 */

const requestEmailChangeController = async (req, res, next) => {
  try {
    const userId = req.user.userId; // desde JWT
    const { newEmail } = req.body;

    validateNewEmail(newEmail);

    await requestEmailChange(userId, newEmail);

    res.json({ message: 'Se ha enviado un enlace de verificación al nuevo correo.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { requestEmailChangeController };
