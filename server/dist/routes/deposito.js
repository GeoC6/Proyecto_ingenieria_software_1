"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deposito_1 = require("../controllers/deposito");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todos los depósitos
router.get('/list', auth_1.default, deposito_1.getAllDepositos);
// Obtener un depósito por su código de banco
router.get('/:cod_banco', auth_1.default, deposito_1.getDeposito);
// Crear un nuevo depósito
router.post('/', auth_1.default, deposito_1.createDeposito);
// Actualizar un depósito por su código de banco
router.put('/:cod_banco', auth_1.default, deposito_1.updateDeposito);
// Eliminar un depósito por su código de banco
router.delete('/:cod_banco', auth_1.default, deposito_1.deleteDeposito);
exports.default = router;
