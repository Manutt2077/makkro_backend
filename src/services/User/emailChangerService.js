const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const requestEmailChange = async (userId, newEmail) => {
  // Verifica si el nuevo correo ya está en uso
  const existing = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existing) {
    const error = new Error('Este correo ya está en uso');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ userId, newEmail }, JWT_SECRET, { expiresIn: '15m' });

  const verificationLink = `https://tuapp.com/confirmar-cambio-email?token=${token}`;

  // Aquí podrías usar nodemailer o por ahora simularlo:
  console.log(`Simulación de envío: Enlace de verificación -> ${verificationLink}`);
};

module.exports = { requestEmailChange };
