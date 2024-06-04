"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFactura = exports.updateFactura = exports.newFactura = exports.getFacturas = void 0;
const facturas_1 = require("../models/facturas");
const getFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaFacturas = yield facturas_1.Facturas.findAll();
        res.json(listaFacturas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las facturas.' });
    }
});
exports.getFacturas = getFacturas;
const newFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_CLIENTE, FECHA_EMISION, FECHA_VENCIMIENTO, MONTO_TOTAL, ESTADO } = req.body;
    try {
        yield facturas_1.Facturas.create({
            COD_CLIENTE,
            FECHA_EMISION,
            FECHA_VENCIMIENTO,
            MONTO_TOTAL,
            ESTADO,
        });
        return res.status(201).json({
            msg: 'Factura creada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear la factura',
            error,
        });
    }
});
exports.newFactura = newFactura;
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_FACTURA } = req.params;
    const { COD_CLIENTE, FECHA_EMISION, FECHA_VENCIMIENTO, MONTO_TOTAL, ESTADO } = req.body;
    try {
        const factura = yield facturas_1.Facturas.findByPk(COD_FACTURA);
        if (!factura) {
            return res.status(404).json({
                msg: 'Factura no encontrada',
            });
        }
        yield factura.update({
            COD_CLIENTE,
            FECHA_EMISION,
            FECHA_VENCIMIENTO,
            MONTO_TOTAL,
            ESTADO,
        });
        return res.json({
            msg: 'Factura actualizada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al actualizar la factura',
            error,
        });
    }
});
exports.updateFactura = updateFactura;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_FACTURA } = req.params;
    try {
        const factura = yield facturas_1.Facturas.findByPk(COD_FACTURA);
        if (!factura) {
            return res.status(404).json({
                msg: 'Factura no encontrada',
            });
        }
        yield factura.destroy();
        return res.json({
            msg: 'Factura eliminada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al eliminar la factura',
            error,
        });
    }
});
exports.deleteFactura = deleteFactura;
