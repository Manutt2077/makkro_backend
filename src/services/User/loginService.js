const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = new Error('Contraseña incorrecta');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user: { id: user.user_id, name: user.name, email: user.email } };
};

module.exports = { login };
