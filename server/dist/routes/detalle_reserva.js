"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_reserva_1 = require("../controllers/detalle_reserva");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todos los detalles de reserva
router.get('/list', detalle_reserva_1.getDetallesReserva);
// Obtener un detalle de reserva por ID
router.get('/:cod_detalle_reserva',  detalle_reserva_1.getDetalleReserva);
// Crear un nuevo detalle de reserva
// Actualizar un detalle de reserva por ID
router.put('/:cod_detalle_reserva',  detalle_reserva_1.updateDetalleReserva);
// Eliminar un detalle de reserva por ID
router.delete('/:cod_detalle_reserva', auth_1.default, detalle_reserva_1.deleteDetalleReserva);
exports.default = router;
