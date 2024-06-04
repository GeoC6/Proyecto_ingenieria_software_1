"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodos_de_pago_1 = require("../controllers/metodos_de_pago");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todos los métodos de pago
router.get('/list', auth_1.default, metodos_de_pago_1.getAllMetodos);
// Obtener un método de pago por su código
router.get('/:cod_metodo_de_pago', auth_1.default, metodos_de_pago_1.getMetodo);
// Crear un nuevo método de pago
router.post('/', auth_1.default, metodos_de_pago_1.createMetodo);
// Actualizar un método de pago por su código
router.put('/:cod_metodo_de_pago', auth_1.default, metodos_de_pago_1.updateMetodo);
// Eliminar un método de pago por su código
router.delete('/:cod_metodo_de_pago', auth_1.default, metodos_de_pago_1.deleteMetodo);
exports.default = router;
