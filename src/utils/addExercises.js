const { prisma } = require('../config/prismaClient');

const exercises = [
  {
    name: 'Peso muerto',
    description: 'Ejercicio compuesto para espalda baja, glúteos y piernas.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Dominadas',
    description: 'Ejercicio con peso corporal para espalda y bíceps.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Press militar',
    description: 'Trabajo de hombros con barra o mancuernas.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Zancadas',
    description: 'Ejercicio para piernas y equilibrio.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Curl de bíceps',
    description: 'Aislamiento del bíceps con mancuernas o barra.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Extensión de tríceps',
    description: 'Aislamiento del tríceps con mancuerna o polea.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Abdominales bicicleta',
    description: 'Trabaja abdominales oblicuos y recto abdominal.',
    type: 'Resistencia',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Burpees',
    description: 'Ejercicio completo de cardio y fuerza explosiva.',
    type: 'Cardio',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Mountain climbers',
    description: 'Cardio con activación del core.',
    type: 'Cardio',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Saltar la cuerda',
    description: 'Excelente para resistencia cardiovascular y coordinación.',
    type: 'Cardio',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Remo con barra',
    description: 'Trabajo de espalda y bíceps.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Face pull',
    description: 'Fortalece hombros y parte superior de la espalda.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Elevaciones laterales',
    description: 'Aislamiento del deltoides lateral.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Pull-over',
    description: 'Trabajo de dorsales y pectorales.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Crunch abdominal',
    description: 'Ejercicio básico para el recto abdominal.',
    type: 'Resistencia',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Crunch inverso',
    description: 'Enfocado en la parte inferior del abdomen.',
    type: 'Resistencia',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Elevaciones de piernas',
    description: 'Trabaja el abdomen inferior.',
    type: 'Resistencia',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Hip thrust',
    description: 'Enfocado en glúteos y cadera.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Peso muerto rumano',
    description: 'Mayor énfasis en los isquiotibiales.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Jalón al pecho',
    description: 'Alternativa asistida a dominadas.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Remo en máquina',
    description: 'Ejercicio guiado para espalda.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Press inclinado',
    description: 'Variación del press para trabajar la parte superior del pecho.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Fondos en paralelas',
    description: 'Ejercicio para tríceps y pecho con peso corporal.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Step-ups',
    description: 'Trabaja piernas y glúteos con coordinación.',
    type: 'Fuerza',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Jump squats',
    description: 'Sentadilla explosiva para potencia y cardio.',
    type: 'Cardio',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Estiramiento de gato-vaca',
    description: 'Movilidad para columna y espalda.',
    type: 'Movilidad',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Rotaciones de cadera',
    description: 'Ejercicio de movilidad articular.',
    type: 'Movilidad',
    ex_img: null,
    ex_vid: null
  },
  {
    name: 'Estiramiento de hombros',
    description: 'Aumenta la flexibilidad del hombro.',
    type: 'Movilidad',
    ex_img: null,
    ex_vid: null
  }
];

async function seedExercises() {
  try {
    for (const exercise of exercises) {
      await prisma.exercise.upsert({
        where: { name: exercise.name },
        update: {},
        create: exercise
      });
    }
    console.log('✅ Ejercicios insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando ejercicios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedExercises();
