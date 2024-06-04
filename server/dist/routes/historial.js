"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historial_1 = require("../controllers/historial");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo historial
router.post('/', historial_1.createHistorial);
// Ruta para obtener la lista de historiales
router.get('/list', historial_1.getHistoriales);
// Ruta para obtener un historial por su código
router.get('/:COD_HISTORIAL', historial_1.getHistorial);
// Ruta para eliminar un historial por su código
router.delete('/:COD_HISTORIAL', historial_1.deleteHistorial);
// Ruta para actualizar los datos de un historial por su código
router.put('/:COD_HISTORIAL', historial_1.updateHistorial);
exports.default = router;
