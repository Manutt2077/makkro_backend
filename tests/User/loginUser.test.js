const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const app = require('../../src/app'); // Tu app de Express

const prisma = new PrismaClient();


beforeEach(async () => {
  // Limpiar usuarios antes de cada test
  await prisma.user.deleteMany();
});

afterAll(async () => {
  // Cerrar conexión con Prisma
  await prisma.$disconnect();
});



//test para comprobar el login de un usuario
describe('Tests de inicio de sesión de usuarios', () => {
  it('debería rechazar si faltan campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@gmail.com' }); // Falta la contraseña
    expect(res.statusCode).toBe(400);   
    expect(res.body).toHaveProperty('error');
    });


  //test para comprobar con un email incorrecto
  it('debería rechazar si el email no está registrado', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test1@gmail.com', password: 'password123' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
  });


  //test para comprobar con una contraseña incorrecta(ya hay un usuario registrado)
  it('debería rechazar si la contraseña es incorrecta', async () => {
    // Primero creamos un usuario con email 'test@gmail.com' y contraseña 'correctPassword'
    const hashedPassword = await bcrypt.hash('correctPassword', 12);
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test123213@gmail.com',
        password: hashedPassword,
        // Añadir otros campos necesarios según tu esquema
        user_id: 'test2', // UUID ejemplo
        weight: 70,
        age: 30
      }
    });
    
    // Ahora intentamos iniciar sesión con la contraseña incorrecta
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test123213@gmail.com', password: 'password1234' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Contraseña incorrecta');
  });

it('debería iniciar sesión correctamente con credenciales válidas', async () => {
  // Primero creamos un usuario
  const hashedPassword = await bcrypt.hash('correctPassword', 12);
  const createdUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test4@gmail.com',
      password: hashedPassword,
      user_id: 'test5',
      weight: 70,
      age: 30
    }
  });

  // Ahora intentamos iniciar sesión con las credenciales correctas
  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'test4@gmail.com', password: 'correctPassword' });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('token');
  expect(res.body).toHaveProperty('user');
  expect(res.body.user).toHaveProperty('id'); // Cambiar de 'user_id' a 'id'
  expect(res.body.user).toHaveProperty('name', 'Test User');
  expect(res.body.user).toHaveProperty('email', 'test4@gmail.com');
});


});