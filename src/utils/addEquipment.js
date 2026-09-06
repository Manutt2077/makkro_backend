// prisma/seedEquipment.js
const { prisma } = require('../config/prismaClient');

const equipmentList = [
  'Peso corporal',
  'Mancuernas',
  'Barra',
  'Banco',
  'Máquina',
  'Polea',
  'Banda elástica',
  'Kettlebell',
  'Fitball'
];

async function seedEquipment() {
  try {
    for (const name of equipmentList) {
      await prisma.equipment.upsert({
        where: { name },
        update: {},
        create: { name }
      });
    }
    console.log('✅ Equipamiento insertado correctamente');
  } catch (error) {
    console.error('❌ Error insertando equipamiento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedEquipment();
