const validateUpdate = (data) => { 
  const { name, weight, age, img_profile } = data;
    if (!name && weight === undefined && age === undefined && !img_profile) {
        return 'Al menos un campo debe ser actualizado';
    }
    // Validación de nombre no puede estar vacío no puede contener números ni caracteres especiales
    if (name && typeof name !== 'string') {
        return 'El nombre debe ser una cadena de texto';
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (name && !nameRegex.test(name)) {
        return 'El nombre no puede contener números o caracteres especiales';
    }
    // Validación de peso debe ser un número no negativo
    if (weight !== undefined && (typeof weight !== 'number' || weight < 0)) {
        return 'Introduce un peso válido';
    }
    // Validación de edad debe ser un número no negativo
    if (age !== undefined && (typeof age !== 'number' || age < 0)) {
        return 'Introduce una edad válida';
    }
    
    //no se valida img_profil
}

module.exports = { validateUpdate };
