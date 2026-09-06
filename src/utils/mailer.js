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