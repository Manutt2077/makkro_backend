const validateLogin = ({ email, password }) => {
  if (!email || !password) return 'Email y contraseña son obligatorios';
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return 'Email no válido';
  return null;
};

module.exports = { validateLogin };
