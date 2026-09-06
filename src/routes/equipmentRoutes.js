// src/routes/equipmentRoutes.js
const express = require('express');
const router = express.Router();
const { updateEquipment } = require('../controllers/Equipment/updateEquipment');

router.put('/update/:id', updateEquipment); 

module.exports = router;
