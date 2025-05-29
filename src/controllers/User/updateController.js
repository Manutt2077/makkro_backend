const { validateUpdate } = require('../../validators/User/updateValidator');
const userService = require('../../services/User/updateService');
/**
 * Controlador para actualizar el perfil del usuario.
 * 
 * @param {Object} req - Request object que contiene los datos del usuario a actualizar.
 * @param {Object} res - Response object para enviar la respuesta al cliente.
 * @param {Function} next - Función para pasar al siguiente middleware en caso de error.
 */

const updateUser = async (req, res, next) => {
    // Validar los datos de entrada
    const validationError = validateUpdate(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    
  try {
    const userId = req.user.userId; // <- viene del JWT
    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, updateData);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser };
