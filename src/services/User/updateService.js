const { prisma } = require('../../config/prismaClient');

const updateUser = async (userId, updateData) => {
  const user = await prisma.user.findUnique({ where: { user_id: userId } });

  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }


  delete updateData.user_id;
  delete updateData.password;
  delete updateData.email; 

  const allowedFields = ['name', 'weight', 'age', 'img_profile'];
  const safeUpdateData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      safeUpdateData[field] = updateData[field];
    }
  }

  const updatedUser = await prisma.user.update({
    where: { user_id: userId },
    data: safeUpdateData,
  });

  return {
    id: updatedUser.user_id,
    name: updatedUser.name,
    weight: updatedUser.weight,
    age: updatedUser.age,
    img_profile: updatedUser.img_profile,
  };
};

module.exports = { updateUser };
