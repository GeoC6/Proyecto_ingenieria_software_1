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
exports.deleteBoleta = exports.updateBoleta = exports.createBoleta = exports.getBoletasByCliente = exports.getBoleta = exports.getAllBoletas = void 0;
const boleta_1 = require("../models/boleta");
const pagos_1 = require("../models/pagos");
const cliente_1 = require("../models/cliente");
// Obtener todas las boletas
const getAllBoletas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boletas = yield boleta_1.boleta.findAll({
            include: [
                { model: pagos_1.pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
            ],
            attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
        });
        res.json(boletas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las boletas.' });
    }
});
exports.getAllBoletas = getAllBoletas;
// Obtener una boleta por su COD
const getBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const boletaEncontrada = yield boleta_1.boleta.findByPk(id, {
            include: [
                { model: pagos_1.pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
            ],
            attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
        });
        if (!boletaEncontrada) {
            return res.status(404).json({ error: 'Boleta no encontrada.' });
        }
        res.json(boletaEncontrada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la boleta.' });
    }
});
exports.getBoleta = getBoleta;
// Obtener boletas por COD_CLIENTE
const getBoletasByCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codCliente } = req.params;
    try {
        const boletas = yield boleta_1.boleta.findAll({
            where: { COD_CLIENTE: codCliente },
            include: [
                { model: pagos_1.pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
                { model: cliente_1.Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
            ],
            attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
        });
        res.json(boletas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las boletas del cliente.' });
    }
});
exports.getBoletasByCliente = getBoletasByCliente;
// Crear una nueva boleta
const createBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_CLIENTE, COD_PAGO, AMOUNT, STATUS } = req.body;
    try {
        const nuevaBoleta = yield boleta_1.boleta.create({ COD_CLIENTE, COD_PAGO, AMOUNT, STATUS });
        res.status(201).json(nuevaBoleta);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear la boleta.' });
    }
});
exports.createBoleta = createBoleta;
// Actualizar una boleta
const updateBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { AMOUNT, STATUS } = req.body;
    try {
        const boletaEncontrada = yield boleta_1.boleta.findByPk(id);
        if (!boletaEncontrada) {
            return res.status(404).json({ error: 'Boleta no encontrada.' });
        }
        yield boletaEncontrada.update({ AMOUNT, STATUS });
        res.json(boletaEncontrada);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar la boleta.' });
    }
});
exports.updateBoleta = updateBoleta;
// Eliminar una boleta
const deleteBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const boletaEncontrada = yield boleta_1.boleta.findByPk(id);
        if (!boletaEncontrada) {
            return res.status(404).json({ error: 'Boleta no encontrada.' });
        }
        yield boletaEncontrada.destroy();
        res.json({ mensaje: 'Boleta eliminada correctamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la boleta.' });
    }
});
exports.deleteBoleta = deleteBoleta;
