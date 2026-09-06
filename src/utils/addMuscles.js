// prisma/seedMuscles.js
const { prisma } = require('../config/prismaClient');

const muscles = [
  'Pecho',
  'Espalda',
  'Bíceps',
  'Tríceps',
  'Piernas',
  'Hombros',
  'Abdomen',
  'Glúteos',
  'Antebrazos',
  'Trapecios',
  'Gemelos'
];

async function seedMuscles() {
  try {
    for (const name of muscles) {
      await prisma.muscle.upsert({
        where: { name },
        update: {},
        create: { name }
      });
    }
    console.log('✅ Músculos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando músculos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMuscles();
module.exports = { seedMuscles };