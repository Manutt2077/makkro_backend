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

const mailOptions = {
  from: 'Manuel <manuel@miapp.com>',
  to: 'destinatario@ejemplo.com',
  subject: 'Correo de prueba con Mailtrap',
  text: 'Este es un correo de prueba usando Nodemailer + Mailtrap',
  html: '<h2>¡Hola!</h2><p>Correo de prueba con <b>HTML</b> usando Mailtrap.</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('❌ Error al enviar el correo:', error);
  }
  console.log('✅ Correo enviado correctamente:', info.messageId);
});
