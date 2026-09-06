const { prisma } = require('../config/prismaClient');

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

async function seedDays() {
  try {
    for (const name of daysOfWeek) {
      await prisma.day.upsert({
        where: { name },
        update: {},
        create: { name }
      });
    }
    console.log('✅ Días de la semana insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando días:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDays();
module.exports = { seedDays };
