const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../../utils/hashPassword');

const prisma = new PrismaClient();

const register = async ({ user_id,name, email, password, weight, age }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error('Este email ya está registrado');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      user_id,
      name,
      email,
      password: hashedPassword,
      weight,
      age,
    },
  });
};

module.exports = { register };
