"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculo_1 = require("../controllers/vehiculo");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Ruta para crear un nuevo vehículo (requiere token)
router.post('/',  vehiculo_1.newVehiculo); // Comenta temporalmente la validación de token
// Ruta para obtener la lista de vehículos (requiere token)
router.get('/list',  vehiculo_1.getVehiculos); // Comenta temporalmente la validación de token
// Ruta para obtener un vehículo por su patente (requiere token)
router.get('/:patente_cod_vehiculo', auth_1.default, vehiculo_1.getVehiculo); // Comenta temporalmente la validación de token
// Ruta para eliminar un vehículo por su patente (requiere token)
router.delete('/:patente_cod_vehiculo', auth_1.default, vehiculo_1.deleteVehiculo); // Comenta temporalmente la validación de token
// Ruta para actualizar los datos de un vehículo por su patente (requiere token)
router.put('/:patente_cod_vehiculo', vehiculo_1.updateVehiculo); // Comenta temporalmente la validación de token
exports.default = router;
