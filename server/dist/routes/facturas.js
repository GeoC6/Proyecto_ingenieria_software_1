"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturas_1 = require("../controllers/facturas");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', facturas_1.getFacturas);
router.post('/', facturas_1.newFactura);
router.put('/:cod_factura', facturas_1.updateFactura);
router.delete('/:cod_factura', facturas_1.deleteFactura);
exports.default = router;
