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
exports.deletePago = exports.updatePago = exports.createPago = exports.getPago = exports.getAllPagos = void 0;
const pagos_1 = require("../models/pagos");
const facturas_1 = require("../models/facturas"); // Se importa el modelo de facturas
const metodos_de_pago_1 = require("../models/metodos_de_pago");
const deposito_1 = require("../models/deposito");
// Obtener todos los pagos
const getAllPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPagos = yield pagos_1.pagos.findAll({
            include: [
                { model: facturas_1.Facturas, attributes: ['COD_FACTURA'] },
                { model: metodos_de_pago_1.metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
                { model: deposito_1.deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
            ],
        });
        res.json(allPagos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al buscar pagos" });
    }
});
exports.getAllPagos = getAllPagos;
// Obtener un pago por su COD
const getPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pago = yield pagos_1.pagos.findByPk(req.params.id, {
            include: [
                { model: facturas_1.Facturas, attributes: ['COD_FACTURA'] },
                { model: metodos_de_pago_1.metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
                { model: deposito_1.deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
            ],
        });
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(pago);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar id de pagos' });
    }
});
exports.getPago = getPago;
// Crear un nuevo pago
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
        const nuevoPago = yield pagos_1.pagos.create({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
        res.status(201).json(nuevoPago);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear pago' });
    }
});
exports.createPago = createPago;
// Actualizar un pago
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pago = yield pagos_1.pagos.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
        yield pago.update({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
        res.json(pago);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar pago' });
    }
});
exports.updatePago = updatePago;
// Eliminar un pago
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pago = yield pagos_1.pagos.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        yield pago.destroy();
        res.json({ message: 'Pago eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar pago' });
    }
});
exports.deletePago = deletePago;
