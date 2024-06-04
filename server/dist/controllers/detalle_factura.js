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
exports.deleteDetalleFactura = exports.updateDetalleFactura = exports.getDetalleFactura = exports.getDetallesFactura = void 0;
const detalle_factura_1 = require("../models/detalle_factura");
const facturas_1 = require("../models/facturas");
const producto_1 = require("../models/producto");
const getDetallesFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallesFactura = yield detalle_factura_1.Detalle_Factura.findAll({
            include: [
                { model: facturas_1.Facturas, attributes: ['COD_FACTURA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_DETALLE_FACTURA', 'CANTIDAD', 'SUBTOTAL']
        });
        res.json(detallesFactura);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de factura.' });
    }
});
exports.getDetallesFactura = getDetallesFactura;
const getDetalleFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_factura } = req.params;
    try {
        const detalleFactura = yield detalle_factura_1.Detalle_Factura.findByPk(cod_detalle_factura, {
            include: [
                { model: facturas_1.Facturas, attributes: ['COD_FACTURA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (detalleFactura) {
            res.json(detalleFactura);
        }
        else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de factura.' });
    }
});
exports.getDetalleFactura = getDetalleFactura;
const updateDetalleFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_factura } = req.params;
    const { cod_factura, cod_producto, cantidad, subtotal } = req.body;
    try {
        const detalleFactura = yield detalle_factura_1.Detalle_Factura.findByPk(cod_detalle_factura);
        if (detalleFactura) {
            yield detalleFactura.update({
                COD_FACTURA: cod_factura,
                COD_PRODUCTO: cod_producto,
                CANTIDAD: cantidad,
                SUBTOTAL: subtotal
            });
            res.json(detalleFactura);
        }
        else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de factura.' });
    }
});
exports.updateDetalleFactura = updateDetalleFactura;
const deleteDetalleFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_factura } = req.params;
    try {
        const detalleFactura = yield detalle_factura_1.Detalle_Factura.findByPk(cod_detalle_factura);
        if (detalleFactura) {
            yield detalleFactura.destroy();
            res.json({ mensaje: 'Detalle de factura eliminado correctamente.' });
        }
        else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de factura.' });
    }
});
exports.deleteDetalleFactura = deleteDetalleFactura;
