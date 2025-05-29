const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const confirmEmailChange = async (userId, newEmail) => {
  const updated = await prisma.user.update({
    where: { user_id: userId },
    data: { email: newEmail },
  });

  return {
    user_id: updated.user_id,
    email: updated.email,
    message: 'Correo actualizado correctamente',
  };
};

module.exports = { confirmEmailChange };
