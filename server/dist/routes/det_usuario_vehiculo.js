"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const det_usuario_vehiculo_1 = require("../controllers/det_usuario_vehiculo");
const router = (0, express_1.Router)();
// Ruta para crear una nueva relación entre usuario y vehículo
router.post('/', det_usuario_vehiculo_1.createDetUsuarioVehiculo);
// Ruta para obtener todas las relaciones entre usuario y vehículo
router.get('/list', det_usuario_vehiculo_1.getDetUsuarioVehiculos);
// Ruta para obtener una relación entre usuario y vehículo por su código
router.get('/:COD_USUARIO_VEHICULO', det_usuario_vehiculo_1.getDetUsuarioVehiculo);
// Ruta para eliminar una relación entre usuario y vehículo por su código
router.delete('/:COD_USUARIO_VEHICULO', det_usuario_vehiculo_1.deleteDetUsuarioVehiculo);
exports.default = router;
