const request = require('supertest');
const { prisma } = require('../../src/config/prismaClient');
const app = require('../../src/app'); 

beforeEach(async () => {
  // Limpiar usuarios antes de cada test
  await prisma.user.deleteMany();
});

afterAll(async () => {
  // Cerrar conexión con Prisma
  await prisma.$disconnect();
});

describe('Tests registro de usuarios', () => {
  it('debería rechazar si faltan campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'ejemplo@test.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });


  
  it('debería rechazar si el email ya está en uso', async () => {
    // Primer registro exitoso
    const res1 = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario Uno',
      email: 'test12321324@mail.com',
      password: 'password123',
      confirmPassword: 'password123',
      weight: 70,
      age: 25,
    });

    expect(res1.statusCode).toBe(201);

    // Segundo registro con el mismo email
    const res2 = await request(app).post('/api/users/register').send({
      user_id: 'user456',
      name: 'Usuario Dos',
      email: 'test12321324@mail.com', // Mismo email
      password: 'password123',
      confirmPassword: 'password123',
      weight: 75,
      age: 30,
    });

    console.log('Respuesta del segundo intento:', res2.body); 

    expect(res2.statusCode).toBe(400);
    expect(res2.body).toHaveProperty('error', 'Este email ya está registrado');
  });

  it('debería registrar un nuevo usuario correctamente', async () => {
    const res = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario Test',
      email: 'newuser@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      weight: 70,
      age: 25,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuario creado correctamente');
    // Verificar que el usuario se haya guardado en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: 'newuser@gmail.com' },
    });
    expect(user).toBeDefined();
    expect(user.user_id).toBe('user123');
    expect(user.name).toBe('Usuario Test');
    expect(user.email).toBe('newuser@gmail.com');
    expect(user.weight).toBe(70);
    expect(user.age).toBe(25);
  });

  it('debería rechazar si la contraseña es demasiado corta', async () => {
    const res = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario Test',
      email: 'test@gmail.com',
      password: 'short', // Contraseña demasiado corta
      confirmPassword: 'short',
      weight: 70,
      age: 25,

    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'La contraseña debe tener al menos 8 caracteres');
  });

  //comprobar que el campo name tenga datos validos no aceptar numeros o caracteres especiales
  it('debería rechazar si el campo name contiene números o caracteres especiales', async () => {
    const res = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario123!', // Nombre inválido
      email: 'test@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      weight: 70,
      age: 25,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'El nombre no puede contener números o caracteres especiales');
  });

  it('debería rechazar si el campo weight es negativo o no es un número', async () => {
    const res = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario Test',
      email: 'test@gmai.com',
      password: 'password123',
      confirmPassword: 'password123',
      weight: '-70', // Peso inválido (string negativo)
      age: 25,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Introduce un peso válido');
  });

  it('debería rechazar si el campo age es negativo o no es un número', async () => {
    const res = await request(app).post('/api/users/register').send({
      user_id: 'user123',
      name: 'Usuario Test',
      email: 'test@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      weight: 70,
      age: '-25', // Edad inválida
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Introduce una edad válida');
  });

  //comprobar que el usuario se puede regitrar sin el campo weight y age
it('debería registrar un usuario sin los campos weight y age', async () => {
  const res = await request(app).post('/api/users/register').send({
    user_id: 'user123',
    name: 'Usuario Test',
    email: 'test231232132@gmail.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('message', 'Usuario creado correctamente');

  const user = await prisma.user.findUnique({
    where: { email: 'test231232132@gmail.com' },
  });

  expect(user).toBeDefined();
  expect(user?.user_id).toBe('user123');
  expect(user?.name).toBe('Usuario Test');
  expect(user?.email).toBe('test231232132@gmail.com');
  expect(user?.weight).toBeNull();
  expect(user?.age).toBeNull();

  // Limpieza: eliminar el usuario creado
  await prisma.user.delete({
    where: { email: 'test231232132@gmail.com' },
  });
});


});
