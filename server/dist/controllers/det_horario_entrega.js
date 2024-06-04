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
exports.deleteHorarioEntrega = exports.updateHorarioEntrega = exports.getHorarioEntrega = exports.newHorarioEntrega = exports.getDetalle_horario_entregas = void 0;
const det_horario_entrega_1 = require("../models/det_horario_entrega");
const getDetalle_horario_entregas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDetalle_horario_entregas = yield det_horario_entrega_1.Detalle_horario_entrega.findAll({ attributes: ['COD_HORARIO_ENTREGA', 'HORA_ENTREGA'] });
        res.json(listDetalle_horario_entregas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error  al obtener los detalles de horario de entrega.' });
    }
});
exports.getDetalle_horario_entregas = getDetalle_horario_entregas;
// Crear un registro de horario de entrega
const newHorarioEntrega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_HORARIO_ENTREGA, HORA_ENTREGA } = req.body;
    try {
        const horarioEntrega = yield det_horario_entrega_1.Detalle_horario_entrega.create({
            COD_HORARIO_ENTREGA,
            HORA_ENTREGA,
        });
        return res.status(201).json({
            msg: 'Horario de entrega creado correctamente',
            horarioEntrega,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al crear el horario de entrega',
            error
        });
    }
});
exports.newHorarioEntrega = newHorarioEntrega;
// Obtener información de un horario de entrega por su código
const getHorarioEntrega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const horarioEntrega = yield det_horario_entrega_1.Detalle_horario_entrega.findOne({
        where: {
            COD_HORARIO_ENTREGA: codigo
        }
    });
    if (!horarioEntrega) {
        return res.status(404).json({
            msg: 'Horario de entrega no encontrado',
        });
    }
    try {
        return res.json(horarioEntrega);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al buscar el horario de entrega',
            error
        });
    }
});
exports.getHorarioEntrega = getHorarioEntrega;
// Actualizar información de un horario de entrega por su código
const updateHorarioEntrega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const updateData = req.body;
    const horarioEntrega = yield det_horario_entrega_1.Detalle_horario_entrega.findOne({
        where: {
            COD_HORARIO_ENTREGA: codigo
        }
    });
    if (!horarioEntrega) {
        return res.status(404).json({
            msg: 'Horario de entrega no encontrado',
        });
    }
    try {
        // Actualizar los datos
        yield horarioEntrega.update(updateData);
        return res.json({
            msg: 'Horario de entrega actualizado correctamente',
            horarioEntrega,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: 'Ocurrió un error al actualizar el horario de entrega',
            error,
        });
    }
});
exports.updateHorarioEntrega = updateHorarioEntrega;
// Eliminar un horario de entrega por su código
const deleteHorarioEntrega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const horarioEntrega = yield det_horario_entrega_1.Detalle_horario_entrega.findOne({
            where: {
                COD_HORARIO_ENTREGA: codigo
            }
        });
        if (!horarioEntrega) {
            return res.status(404).json({
                msg: 'Horario de entrega no encontrado',
            });
        }
        yield horarioEntrega.destroy();
        return res.json({
            msg: 'Horario de entrega eliminado correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al eliminar el horario de entrega',
            error
        });
    }
});
exports.deleteHorarioEntrega = deleteHorarioEntrega;
