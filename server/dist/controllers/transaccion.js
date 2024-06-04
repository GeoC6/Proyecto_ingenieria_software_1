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
exports.deleteTransaccion = exports.updateTransaccion = exports.createTransaccion = exports.getTransaccion = exports.getAllTransacciones = void 0;
const transaccion_1 = require("../models/transaccion");
const pagos_1 = require("../models/pagos");
// Obtener todas las transacciones
const getAllTransacciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transacciones = yield transaccion_1.transaccion.findAll({
            include: [
                { model: pagos_1.pagos, attributes: ['COD_PAGO'] },
            ],
            attributes: ['COD_TRANSACCION', 'COD_PAGO', 'FECHA_PAGO', 'ESTADO_TRANSACCION']
        });
        res.json(transacciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las transacciones.' });
    }
});
exports.getAllTransacciones = getAllTransacciones;
// Obtener una transacción por su COD
const getTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaccionEncontrada = yield transaccion_1.transaccion.findByPk(id, {
            include: [
                { model: pagos_1.pagos, attributes: ['COD_PAGO'] },
            ],
            attributes: ['COD_TRANSACCION', 'COD_PAGO', 'FECHA_PAGO', 'ESTADO_TRANSACCION']
        });
        if (!transaccionEncontrada) {
            return res.status(404).json({ error: 'Transacción no encontrada.' });
        }
        res.json(transaccionEncontrada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la transacción.' });
    }
});
exports.getTransaccion = getTransaccion;
// Crear una nueva transacción
const createTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_PAGO } = req.body;
    try {
        const nuevaTransaccion = yield transaccion_1.transaccion.create({ COD_PAGO });
        res.status(201).json(nuevaTransaccion);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear la transacción.' });
    }
});
exports.createTransaccion = createTransaccion;
// Actualizar una transacción
const updateTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { ESTADO_TRANSACCION } = req.body;
    try {
        const transaccionEncontrada = yield transaccion_1.transaccion.findByPk(id);
        if (!transaccionEncontrada) {
            return res.status(404).json({ error: 'Transacción no encontrada.' });
        }
        yield transaccionEncontrada.update({ ESTADO_TRANSACCION });
        res.json(transaccionEncontrada);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar la transacción.' });
    }
});
exports.updateTransaccion = updateTransaccion;
// Eliminar una transacción
const deleteTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaccionEncontrada = yield transaccion_1.transaccion.findByPk(id);
        if (!transaccionEncontrada) {
            return res.status(404).json({ error: 'Transacción no encontrada.' });
        }
        yield transaccionEncontrada.destroy();
        res.json({ mensaje: 'Transacción eliminada correctamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la transacción.' });
    }
});
exports.deleteTransaccion = deleteTransaccion;
