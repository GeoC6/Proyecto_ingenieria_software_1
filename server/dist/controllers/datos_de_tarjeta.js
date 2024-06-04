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
exports.deleteDatoTarjeta = exports.updateDatoTarjeta = exports.createDatoTarjeta = exports.getDatoTarjeta = exports.getAllDatosTarjeta = void 0;
const datos_de_tarjeta_1 = require("../models/datos_de_tarjeta");
// Obtener todos los datos de tarjeta
const getAllDatosTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datosTarjeta = yield datos_de_tarjeta_1.datos_de_tarjeta.findAll({
            attributes: ['NUMERO', 'FECHA_DE_VENCIMIENTO', 'CVC']
        });
        res.json(datosTarjeta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de tarjeta.' });
    }
});
exports.getAllDatosTarjeta = getAllDatosTarjeta;
// Obtener un dato de tarjeta por su COD
const getDatoTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const datoTarjeta = yield datos_de_tarjeta_1.datos_de_tarjeta.findByPk(id, {
            attributes: ['NUMERO', 'FECHA_DE_VENCIMIENTO', 'CVC']
        });
        if (!datoTarjeta) {
            return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
        }
        res.json(datoTarjeta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el dato de tarjeta.' });
    }
});
exports.getDatoTarjeta = getDatoTarjeta;
// Crear un nuevo dato de tarjeta
const createDatoTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
    try {
        const nuevoDatoTarjeta = yield datos_de_tarjeta_1.datos_de_tarjeta.create({ FECHA_DE_VENCIMIENTO, CVC });
        res.status(201).json(nuevoDatoTarjeta);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el dato de tarjeta.' });
    }
});
exports.createDatoTarjeta = createDatoTarjeta;
// Actualizar un dato de tarjeta
const updateDatoTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
    try {
        const datoTarjeta = yield datos_de_tarjeta_1.datos_de_tarjeta.findByPk(id);
        if (!datoTarjeta) {
            return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
        }
        yield datoTarjeta.update({ FECHA_DE_VENCIMIENTO, CVC });
        res.json(datoTarjeta);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar el dato de tarjeta.' });
    }
});
exports.updateDatoTarjeta = updateDatoTarjeta;
// Eliminar un dato de tarjeta
const deleteDatoTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const datoTarjeta = yield datos_de_tarjeta_1.datos_de_tarjeta.findByPk(id);
        if (!datoTarjeta) {
            return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
        }
        yield datoTarjeta.destroy();
        res.json({ mensaje: 'Dato de tarjeta eliminado correctamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el dato de tarjeta.' });
    }
});
exports.deleteDatoTarjeta = deleteDatoTarjeta;
