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
exports.updateHistorial = exports.deleteHistorial = exports.getHistorial = exports.getHistoriales = exports.createHistorial = void 0;
const historial_1 = require("../models/historial");
// Crear un nuevo historial
const createHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FECHA_HISTORIAL } = req.body;
    try {
        const historial = yield historial_1.Historial.create({
            FECHA_HISTORIAL
        });
        return res.json({
            msg: 'Historial creado correctamente',
            historial
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
});
exports.createHistorial = createHistorial;
// Obtener todos los historiales
const getHistoriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const historiales = yield historial_1.Historial.findAll({
        attributes: ['COD_HISTORIAL', 'FECHA_HISTORIAL']
    });
    res.json(historiales);
});
exports.getHistoriales = getHistoriales;
// Obtener un historial por su código
const getHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_HISTORIAL } = req.params;
    const historial = yield historial_1.Historial.findOne({ where: { COD_HISTORIAL } });
    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código indicado no existe"
        });
    }
    try {
        return res.json(historial);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getHistorial = getHistorial;
// Eliminar un historial por su código
const deleteHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_HISTORIAL } = req.params;
    const historial = yield historial_1.Historial.findOne({ where: { COD_HISTORIAL } });
    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código " + COD_HISTORIAL + " no existe"
        });
    }
    try {
        yield historial_1.Historial.destroy({ where: { COD_HISTORIAL } });
        res.json({
            msg: "Se ha eliminado el historial con código: " + COD_HISTORIAL
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el historial con código: " + COD_HISTORIAL,
            error
        });
    }
});
exports.deleteHistorial = deleteHistorial;
// Actualizar un historial por su código
const updateHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_HISTORIAL } = req.params;
    const { FECHA_HISTORIAL } = req.body;
    const historial = yield historial_1.Historial.findOne({ where: { COD_HISTORIAL } });
    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código " + COD_HISTORIAL + " no existe"
        });
    }
    try {
        yield historial_1.Historial.update({ FECHA_HISTORIAL }, { where: { COD_HISTORIAL } });
        res.json({
            msg: "Se ha actualizado el historial con código: " + COD_HISTORIAL
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el historial con código: " + COD_HISTORIAL,
            error
        });
    }
});
exports.updateHistorial = updateHistorial;
