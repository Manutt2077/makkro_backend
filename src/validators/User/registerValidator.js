function validateRegister(data) {
  const { user_id, name, email, password } = data;

  if (!user_id || !name || !email || !password) {
    return 'Todos los campos obligatorios deben ser rellenados';
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email no válido';
  }

  //validacion de name sin caracteres especiales ni números
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return 'El nombre no puede contener números o caracteres especiales';
  }

  // Validación de longitud de contraseña
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }

  //validacion campo weight no puede ser negativo o que no sea un numero
  if (data.weight !== undefined && (typeof data.weight !== 'number' || data.weight < 0)) {
    return 'Introduce un peso válido';
  }

  //validacion campo age no puede ser negativo o que no sea un numero
  if (data.age !== undefined && (typeof data.age !== 'number' || data.age < 0)) {
    return 'Introduce una edad válida';
  }

  return null; 
}

module.exports = { validateRegister };