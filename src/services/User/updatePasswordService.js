require('dotenv').config();
const { prisma } = require('../../config/prismaClient');
const bcrypt = require('bcrypt');

const updatePassword = async (userId, currentPassword, newPassword, confirmNewPassword) => {

  const user = await prisma.user.findUnique({
    where: { user_id: userId }
  });


  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }


  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    const error = new Error('Contraseña actual incorrecta');
    error.statusCode = 401;
    throw error;
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    const error = new Error('La nueva contraseña debe ser diferente a la actual');
    error.statusCode = 400;
    throw error;
  }

  
  const saltRounds = 12;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  
  const updatedUser = await prisma.user.update({
    where: { user_id: userId },
    data: { password: hashedNewPassword },
    select: { user_id: true, email: true,  } 
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
