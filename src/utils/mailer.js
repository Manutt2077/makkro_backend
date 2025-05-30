const nodemailer = require('nodemailer');
// Load environment variables from .env file
require('dotenv').config();

const transporter = nodemailer.createTransport({
    //usa las variables de entorno de tu proyecto
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,       // <-- tu username
    pass: process.env.MAIL_PASS  // <-- pon aquí la contraseña completa que se oculta con ****e8ee
  }
});

async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: 'GymTrack App <no-reply@gymtrack.com>',
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar el email:', error);
  }
}

module.exports = sendEmail;