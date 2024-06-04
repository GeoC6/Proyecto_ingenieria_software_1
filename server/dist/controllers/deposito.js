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
exports.deleteDeposito = exports.updateDeposito = exports.createDeposito = exports.getDeposito = exports.getAllDepositos = void 0;
const deposito_1 = require("../models/deposito");
// Obtener todos los depósitos
const getAllDepositos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depositos = yield deposito_1.deposito.findAll({
            attributes: ['COD_BANCO', 'NOMBRE_BANCO', 'NUMERO_DE_CUENTA']
        });
        res.json(depositos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los depósitos.' });
    }
});
exports.getAllDepositos = getAllDepositos;
// Obtener un depósito por su COD
const getDeposito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_banco } = req.params;
    try {
        const depositoEncontrado = yield deposito_1.deposito.findByPk(cod_banco, {
            attributes: ['COD_BANCO', 'NOMBRE_BANCO', 'NUMERO_DE_CUENTA']
        });
        if (depositoEncontrado) {
            res.json(depositoEncontrado);
        }
        else {
            res.status(404).json({ error: 'Depósito no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el depósito.' });
    }
});
exports.getDeposito = getDeposito;
// Crear un nuevo depósito
const createDeposito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_BANCO, NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
    try {
        const nuevoDeposito = yield deposito_1.deposito.create({ COD_BANCO, NOMBRE_BANCO, NUMERO_DE_CUENTA });
        res.status(201).json(nuevoDeposito);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el depósito.' });
    }
});
exports.createDeposito = createDeposito;
// Actualizar un depósito
const updateDeposito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_banco } = req.params;
    const { NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
    try {
        const depositoEncontrado = yield deposito_1.deposito.findByPk(cod_banco);
        if (depositoEncontrado) {
            yield depositoEncontrado.update({ NOMBRE_BANCO, NUMERO_DE_CUENTA });
            res.json(depositoEncontrado);
        }
        else {
            res.status(404).json({ error: 'Depósito no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el depósito.' });
    }
});
exports.updateDeposito = updateDeposito;
// Eliminar un depósito
const deleteDeposito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_banco } = req.params;
    try {
        const depositoEncontrado = yield deposito_1.deposito.findByPk(cod_banco);
        if (depositoEncontrado) {
            yield depositoEncontrado.destroy();
            res.json({ mensaje: 'Depósito eliminado correctamente.' });
        }
        else {
            res.status(404).json({ error: 'Depósito no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el depósito.' });
    }
});
exports.deleteDeposito = deleteDeposito;
