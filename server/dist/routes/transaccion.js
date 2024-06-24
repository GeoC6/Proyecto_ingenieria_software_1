"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaccion_1 = require("../controllers/transaccion");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todas las transacciones
router.get('/list', auth_1.default, transaccion_1.getAllTransacciones);
// Obtener una transacción por su COD
router.get('/:cod_transaccion', auth_1.default, transaccion_1.getTransaccion);
// Crear una nueva transacción
router.post('/', auth_1.default, transaccion_1.createTransaccion);
// Actualizar una transacción por su COD
router.put('/:cod_transaccion', auth_1.default, transaccion_1.updateTransaccion);
// Eliminar una transacción por su COD
router.delete('/:cod_transaccion', auth_1.default, transaccion_1.deleteTransaccion);
exports.default = router;
