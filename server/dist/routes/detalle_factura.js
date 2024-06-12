"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_factura_1 = require("../controllers/detalle_factura");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', auth_1.default, detalle_factura_1.getDetallesFactura);
router.get('/:cod_detalle_factura', auth_1.default, detalle_factura_1.getDetalleFactura);
router.put('/:cod_detalle_factura', auth_1.default, detalle_factura_1.updateDetalleFactura);
router.delete('/:cod_detalle_factura', auth_1.default, detalle_factura_1.deleteDetalleFactura);
exports.default = router;
