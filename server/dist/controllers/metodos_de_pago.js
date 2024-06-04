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
exports.deleteMetodo = exports.updateMetodo = exports.createMetodo = exports.getMetodo = exports.getAllMetodos = void 0;
const metodos_de_pago_1 = require("../models/metodos_de_pago");
// Obtener todos los métodos de pago
const getAllMetodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metodos = yield metodos_de_pago_1.metodos_de_pago.findAll({
            attributes: ['COD_METODO_DE_PAGO', 'TIPO', 'DETALLE']
        });
        res.json(metodos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los métodos de pago.' });
    }
});
exports.getAllMetodos = getAllMetodos;
// Obtener un método de pago por su COD
const getMetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_metodo_de_pago } = req.params;
    try {
        const metodo = yield metodos_de_pago_1.metodos_de_pago.findByPk(cod_metodo_de_pago, {
            attributes: ['COD_METODO_DE_PAGO', 'TIPO', 'DETALLE']
        });
        if (metodo) {
            res.json(metodo);
        }
        else {
            res.status(404).json({ error: 'Método de pago no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el método de pago.' });
    }
});
exports.getMetodo = getMetodo;
// Crear un nuevo método de pago
const createMetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TIPO, DETALLE } = req.body;
    try {
        const nuevoMetodo = yield metodos_de_pago_1.metodos_de_pago.create({ TIPO, DETALLE });
        res.status(201).json(nuevoMetodo);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el método de pago.' });
    }
});
exports.createMetodo = createMetodo;
// Actualizar un método de pago
const updateMetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_metodo_de_pago } = req.params;
    const { TIPO, DETALLE } = req.body;
    try {
        const metodo = yield metodos_de_pago_1.metodos_de_pago.findByPk(cod_metodo_de_pago);
        if (metodo) {
            yield metodo.update({ TIPO, DETALLE });
            res.json(metodo);
        }
        else {
            res.status(404).json({ error: 'Método de pago no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el método de pago.' });
    }
});
exports.updateMetodo = updateMetodo;
// Eliminar un método de pago
const deleteMetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_metodo_de_pago } = req.params;
    try {
        const metodo = yield metodos_de_pago_1.metodos_de_pago.findByPk(cod_metodo_de_pago);
        if (metodo) {
            yield metodo.destroy();
            res.json({ mensaje: 'Método de pago eliminado correctamente.' });
        }
        else {
            res.status(404).json({ error: 'Método de pago no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el método de pago.' });
    }
});
exports.deleteMetodo = deleteMetodo;
