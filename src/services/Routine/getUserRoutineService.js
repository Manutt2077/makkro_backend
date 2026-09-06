const { prisma } = require('../../config/prismaClient');

async function getUserRoutines(userId) {
  return await prisma.routine.findMany({
    where: { userId },
    select: {
      name: true,
      created_date: true,
      finish_day: true,
      userId: true,
      dayExercises: {
        select: {
          sets: true,
          reps: true,
          rest: true,
          weight: true,
          day: {
            select: {
              name: true
            }
          },
          exercise: {
            select: {
              name: true,
              description: true,
              ex_img: true,
              type: true,
              equipment: {
                select: {
                  equipment: {
                    select: {
                      name: true,
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}

module.exports = { getUserRoutines };