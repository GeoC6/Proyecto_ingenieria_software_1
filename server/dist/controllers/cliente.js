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
exports.updateCliente = exports.deleteCliente = exports.getCliente = exports.getClientes = exports.createCliente = void 0;
const cliente_1 = require("../models/cliente");
// Crear un nuevo cliente
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO1_CLIENTE, APELLIDO2_CLIENTE, DIRECCION_CLIENTE } = req.body;
    const existingCliente = yield cliente_1.Cliente.findOne({ where: { CELULAR_CLIENTE } });
    if (existingCliente) {
        return res.status(400).json({
            msg: 'Ya existe un cliente con ese número de celular'
        });
    }
    try {
        yield cliente_1.Cliente.create({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO1_CLIENTE,
            APELLIDO2_CLIENTE,
            DIRECCION_CLIENTE
        });
        return res.json({
            msg: 'Cliente creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
});
exports.createCliente = createCliente;
// Obtener todos los clientes
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield cliente_1.Cliente.findAll({
        attributes: ['CELULAR_CLIENTE', 'NOMBRE_CLIENTE', 'APELLIDO1_CLIENTE', 'APELLIDO2_CLIENTE', 'DIRECCION_CLIENTE']
    });
    res.json(clients);
});
exports.getClientes = getClientes;
// Obtener un cliente por su número de celular
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE } = req.params;
    const client = yield cliente_1.Cliente.findOne({ where: { CELULAR_CLIENTE } });
    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular indicado no existe"
        });
    }
    try {
        return res.json(client);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getCliente = getCliente;
// Eliminar un cliente por su número de celular
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE } = req.params;
    const client = yield cliente_1.Cliente.findOne({ where: { CELULAR_CLIENTE } });
    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular " + CELULAR_CLIENTE + " no existe"
        });
    }
    try {
        yield cliente_1.Cliente.destroy({ where: { CELULAR_CLIENTE } });
        res.json({
            msg: "Se ha eliminado el cliente con número de celular: " + CELULAR_CLIENTE
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con número de celular: " + CELULAR_CLIENTE,
            error
        });
    }
});
exports.deleteCliente = deleteCliente;
// Actualizar un cliente por su número de celular
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE } = req.params;
    const client = yield cliente_1.Cliente.findOne({ where: { CELULAR_CLIENTE } });
    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular " + CELULAR_CLIENTE + " no existe"
        });
    }
    try {
        const { NOMBRE_CLIENTE, APELLIDO1_CLIENTE, APELLIDO2_CLIENTE, DIRECCION_CLIENTE } = req.body;
        yield cliente_1.Cliente.update({
            NOMBRE_CLIENTE,
            APELLIDO1_CLIENTE,
            APELLIDO2_CLIENTE,
            DIRECCION_CLIENTE
        }, { where: { CELULAR_CLIENTE } });
        res.json({
            msg: "Se ha actualizado el cliente con número de celular: " + CELULAR_CLIENTE
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con número de celular: " + CELULAR_CLIENTE,
            error
        });
    }
});
exports.updateCliente = updateCliente;
