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
exports.deletePago = exports.updatePago = exports.createPago = exports.getPagosByCliente = exports.getPago = exports.getAllPagos = void 0;
const pagos_1 = require("../models/pagos");
const cliente_1 = require("../models/cliente");
// Obtener todos los pagos
const getAllPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPagos = yield pagos_1.pagos.findAll({
            include: [
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
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
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
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
// Obtener pagos por COD_CLIENTE
const getPagosByCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codCliente } = req.params;
        const pagosByCliente = yield pagos_1.pagos.findAll({
            where: { COD_CLIENTE: codCliente },
            include: [
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
            ],
        });
        res.json(pagosByCliente);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar pagos del cliente' });
    }
});
exports.getPagosByCliente = getPagosByCliente;
// Crear un nuevo pago
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { COD_CLIENTE, BUY_ORDER, AMOUNT, STATUS } = req.body;
        const nuevoPago = yield pagos_1.pagos.create({ COD_CLIENTE, BUY_ORDER, AMOUNT, STATUS });
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
        const { BUY_ORDER, AMOUNT, STATUS } = req.body;
        yield pago.update({ BUY_ORDER, AMOUNT, STATUS });
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
