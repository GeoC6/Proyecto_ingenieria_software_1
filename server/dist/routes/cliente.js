"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.post('/', cliente_1.newCliente);
router.post('/login', cliente_1.loginCliente);
router.get('/list', auth_1.default, cliente_1.getClientes);
router.get('/:cod_cliente', auth_1.default, cliente_1.getCliente);
router.delete('/:cod_cliente', auth_1.default, cliente_1.deleteCliente);
router.put('/:cod_cliente', auth_1.default, cliente_1.updateCliente);
exports.default = router;
