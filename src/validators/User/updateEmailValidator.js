const validateNewEmail = (email) => {
  if (!email || typeof email !== 'string') {
    const error = new Error('El correo es obligatorio');
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error('Formato de correo inválido');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { validateNewEmail };
