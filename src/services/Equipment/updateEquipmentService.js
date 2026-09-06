const { prisma } = require('../../config/prismaClient');


async function updateEquipmentService(equipmentId, data) {
  return await prisma.equipment.update({
    where: { id: equipmentId },
    data,
  });
}

module.exports = {
  updateEquipmentService,
};
