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
exports.deleteDispoFecha = exports.updateDispoFecha = exports.getDispoFecha = exports.newDispoFecha = exports.getDisponibilidad_fechas = void 0;
const dispo_fecha_1 = require("../models/dispo_fecha");
const getDisponibilidad_fechas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDisponibilidad_fechas = yield dispo_fecha_1.Disponibilidad_fecha.findAll({ attributes: ['COD_DISPONIBILIDAD', 'FECHA_ENTREGA', 'COD_HORARIO_ENTREGA'] });
        res.json(listDisponibilidad_fechas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las disponibilidades de fecha.' });
    }
});
exports.getDisponibilidad_fechas = getDisponibilidad_fechas;
// Crear un registro de disponibilidad de fecha
const newDispoFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_DISPONIBILIDAD, FECHA_ENTREGA, COD_HORARIO_ENTREGA } = req.body;
    try {
        const dispoFecha = yield dispo_fecha_1.Disponibilidad_fecha.create({
            COD_DISPONIBILIDAD,
            FECHA_ENTREGA,
            COD_HORARIO_ENTREGA,
        });
        return res.status(201).json({
            msg: 'Disponibilidad de fecha creada correctamente',
            dispoFecha,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al crear la disponibilidad de fecha',
            error,
        });
    }
});
exports.newDispoFecha = newDispoFecha;
// Obtener información de una disponibilidad de fecha por su código
const getDispoFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const dispoFecha = yield dispo_fecha_1.Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });
    if (!dispoFecha) {
        return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        return res.json(dispoFecha);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar la disponibilidad de fecha',
            error,
        });
    }
});
exports.getDispoFecha = getDispoFecha;
// Actualizar información de una disponibilidad de fecha por su código
const updateDispoFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const updateData = req.body;
    const dispoFecha = yield dispo_fecha_1.Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });
    if (!dispoFecha) {
        return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        // Actualizar los datos
        yield dispoFecha.update(updateData);
        return res.json({
            msg: 'Disponibilidad de fecha actualizada correctamente',
            dispoFecha,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al actualizar la disponibilidad de fecha',
            error,
        });
    }
});
exports.updateDispoFecha = updateDispoFecha;
// Eliminar una disponibilidad de fecha por su código
const deleteDispoFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const dispoFecha = yield dispo_fecha_1.Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });
    if (!dispoFecha) {
        return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        yield dispoFecha.destroy();
        return res.json({
            msg: 'Disponibilidad de fecha eliminada correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al eliminar la disponibilidad de fecha',
            error,
        });
    }
});
exports.deleteDispoFecha = deleteDispoFecha;
