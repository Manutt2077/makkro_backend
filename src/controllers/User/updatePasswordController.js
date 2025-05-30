const { updatePassword } = require('../../services/User/updatePasswordService');
//validaciones
const { validateNewPassword } = require('../../validators/User/updatePasswordValidator');

const updatePasswordController = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.userId; // Del token JWT autenticado
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
    // VERIFICACIÓN DE SEGURIDAD: Si alguien envía userId en el body
    if (req.body.userId && req.body.userId !== userIdFromToken) {
      const error = new Error('No tienes permisos para cambiar la contraseña de otro usuario');
      error.statusCode = 403;
      throw error;
    }
    // Validar las contraseñas nuevas
    validateNewPassword(newPassword, confirmNewPassword);
    
    // Llamar al servicio para cambiar la contraseña directamente
    const result = await updatePassword(
      userIdFromToken, 
      currentPassword, 
      newPassword, 
      confirmNewPassword
    );
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { updatePasswordController };