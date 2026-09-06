const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({   
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,      
    pass: process.env.MAIL_PASS  
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
