"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleta_1 = require("../controllers/boleta");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todas las boletas
router.get('/list',  boleta_1.getAllBoletas);
// Obtener una boleta por su COD
router.get('/:cod_transaccion',  boleta_1.getBoleta);
// Obtener una boleta por el COD_CLIENTE
router.get('/cliente/:codCliente',  boleta_1.getBoletasByCliente);
// Crear una nueva boleta
router.post('/',  boleta_1.createBoleta);
// Actualizar una boleta por su COD
router.put('/:cod_transaccion',  boleta_1.updateBoleta);
// Eliminar una boleta por su COD
router.delete('/:cod_transaccion',  boleta_1.deleteBoleta);
exports.default = router;
