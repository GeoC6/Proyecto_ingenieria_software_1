"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagos_1 = require("../controllers/pagos");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todos los pagos
router.get('/list', auth_1.default, pagos_1.getAllPagos);
// Obtener un pago por su código
router.get('/:cod_pago', auth_1.default, pagos_1.getPago);
// Obtener los pagos por el código de cliente
router.get('/cliente/:codCliente', auth_1.default, pagos_1.getPagosByCliente);
// Crear un nuevo pago
router.post('/', auth_1.default, pagos_1.createPago);
// Actualizar un pago por su código
router.put('/:cod_pago', auth_1.default, pagos_1.updatePago);
// Eliminar un pago por su código
router.delete('/:cod_pago', auth_1.default, pagos_1.deletePago);
exports.default = router;
