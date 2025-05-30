const { requestEmailChange } = require('../../services/User/emailChangerService');
const { validateNewEmail } = require('../../validators/User/updateEmailValidator');

const requestEmailChangeController = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.userId; // Del token JWT autenticado
    const { currentPassword, newEmail } = req.body;
    
    // VERIFICACIÓN DE SEGURIDAD: Si alguien envía userId en el body
    if (req.body.userId && req.body.userId !== userIdFromToken) {
      const error = new Error('Error de autorización: No puedes cambiar el email de otro usuario');
      error.statusCode = 403;
      throw error;
    }
    
    // Validar el nuevo email
    validateNewEmail(newEmail);
    
    // Usar SIEMPRE el userId del token autenticado
    await requestEmailChange(userIdFromToken, currentPassword, newEmail);
    
    res.json({ message: 'Se ha enviado un enlace de verificación al nuevo correo.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { requestEmailChangeController };