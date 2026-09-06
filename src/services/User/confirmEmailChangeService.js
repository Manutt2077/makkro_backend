require('dotenv').config();
const { prisma } = require('../../config/prismaClient');

const confirmEmailChange = async (userId, newEmail) => {

  const user = await prisma.user.update({
    where: { user_id: userId },
    data: { email: newEmail },
  });

  return { message: 'Correo actualizado correctamente', user };
};

module.exports = { confirmEmailChange };
