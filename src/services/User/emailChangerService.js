require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../../utils/mailer');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const requestEmailChange = async (userId, currentPassword, newEmail) => {
  // AGREGAR: Obtener el usuario por ID
  const user = await prisma.user.findUnique({
    where: { user_id: userId }
  });

  // AGREGAR: Verificar que el usuario existe
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  // Verificar la contraseña actual (AHORA user está definido)
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    const error = new Error('Contraseña incorrecta');
    error.statusCode = 401;
    throw error;
  }

  // Verificar si el nuevo correo ya está en uso
  const existing = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existing) {
    const error = new Error('Este correo ya está en uso');
    error.statusCode = 400;
    throw error;
  }

  // Generar token INCLUYENDO userId para la confirmación
  const token = jwt.sign({ userId, newEmail }, JWT_SECRET, { expiresIn: '15m' });
  const verificationLink = `http://localhost:4000/api/users/profile/email/confirm?token=${token}`;

  const html = `
    <h2>Confirmar cambio de correo electrónico</h2>
    <p>Has solicitado cambiar tu dirección de correo a <b>${newEmail}</b>.</p>
    <p>Haz clic en el siguiente enlace para confirmar el cambio:</p>
    <p><a href="${verificationLink}">Confirmar nuevo correo</a></p>
    <p>Este enlace expirará en 15 minutos.</p>
  `;

  await sendEmail(newEmail, 'Confirma tu nuevo correo electrónico', html);
};

module.exports = { requestEmailChange };