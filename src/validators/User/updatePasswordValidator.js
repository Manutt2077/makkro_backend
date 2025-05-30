//validator de actualización de contraseña
  // Validación de longitud de contraseña
function validateNewPassword(password, confirmPassword) {
  if (!password || !confirmPassword) {
    return 'Todos los campos obligatorios deben ser rellenados';
  }
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden';
    }

}
module.exports = { validateNewPassword };