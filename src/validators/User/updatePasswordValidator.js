function validateNewPassword(password, confirmPassword) {
  if (!password || !confirmPassword) {
    const error = new Error('Todos los campos obligatorios deben ser rellenados');
    error.statusCode = 400;
    throw error;
  }
  if (password.length < 8) {
    const error = new Error('La contraseña debe tener al menos 8 caracteres');
    error.statusCode = 400;
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error('Las contraseñas no coinciden');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { validateNewPassword };