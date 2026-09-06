// src/controllers/equipmentController.js
const { updateEquipmentService } = require('../../services/Equipment/updateEquipmentService');

const updateEquipment = async (req, res) => {
  const equipmentId = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const updated = await updateEquipmentService(equipmentId, {
      name,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Nombre ya en uso por otro equipo' });
    }

    res.status(500).json({ error: 'No se pudo actualizar el equipo' });
  }
};

module.exports = {
  updateEquipment,
};
