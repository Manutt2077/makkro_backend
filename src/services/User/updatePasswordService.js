require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const updatePassword = async (userId, currentPassword, newPassword, confirmNewPassword) => {
  // Obtener el usuario por ID
  const user = await prisma.user.findUnique({
    where: { user_id: userId }
  });

  // Verificar que el usuario existe
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  // Verificar que las contraseñas nuevas coinciden
  if (newPassword !== confirmNewPassword) {
    const error = new Error('Las contraseñas no coinciden');
    error.statusCode = 400;
    throw error;
  }

  // Verificar que la contraseña actual es correcta
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    const error = new Error('Contraseña actual incorrecta');
    error.statusCode = 401;
    throw error;
  }

  // Verificar que la nueva contraseña es diferente a la actual
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    const error = new Error('La nueva contraseña debe ser diferente a la actual');
    error.statusCode = 400;
    throw error;
  }

  // Hashear la nueva contraseña
  const saltRounds = 12;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Actualizar la contraseña en la base de datos
  const updatedUser = await prisma.user.update({
    where: { user_id: userId },
    data: { password: hashedNewPassword },
    select: { user_id: true, email: true,  } // No devolver la contraseña
  });

  return { 
    message: 'Contraseña actualizada correctamente',
    user: {
      id: updatedUser.user_id,
      email: updatedUser.email,
    }
  };
};

module.exports = { updatePassword };
