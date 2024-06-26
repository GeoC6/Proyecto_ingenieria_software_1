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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCliente = exports.deleteCliente = exports.getCliente = exports.loginCliente = exports.getClientes = exports.newCliente = void 0;
const cliente_1 = require("../models/cliente");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_cliente, contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
    if (!correo_cliente || !contrasena || !celular_cliente || !nombre_cliente || !apellido_cliente || !direccion_cliente) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }
    try {
        const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
        if (cliente) {
            return res.status(400).json({
                msg: 'Ya existe un cliente con ese correo'
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
        yield cliente_1.Cliente.create({
            CORREO_CLIENTE: correo_cliente,
            CONTRASENA: hashedPassword,
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        });
        return res.status(201).json({
            msg: 'Cliente creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el cliente',
            error
        });
    }
});
exports.newCliente = newCliente;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaClientes = yield cliente_1.Cliente.findAll({
            attributes: [
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE'
            ]
        });
        return res.json(listaClientes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
});
exports.getClientes = getClientes;
const loginCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { correo_cliente, contrasena } = req.body;
    const correo_cliente = req.body.correo_cliente;
    const contrasena = req.body.contrasena;
    if (!correo_cliente || !contrasena) {
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios' });
    }
    try {
        const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
        console.log(contrasena, correo_cliente);
        if (!cliente) {
            return res.status(401).json({
                msg: 'El correo ingresado no es válido'
            });
        }
        const passwordValida = yield bcrypt_1.default.compare(contrasena, cliente.CONTRASENA);
        if (!passwordValida) {
            return res.status(401).json({
                msg: 'Contraseña Incorrecta'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            correo_cliente: correo_cliente
        }, process.env.SECRET_KEY || 'PRUEBA1');
        res.json({ token, cliente });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al iniciar sesión',
            error
        });
    }
});
exports.loginCliente = loginCliente;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_cliente } = req.params;
    try {
        const cliente = yield cliente_1.Cliente.findOne({
            attributes: [
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE',
                // 'CODIGO_CLIENTE'
            ],
            where: { CORREO_CLIENTE: correo_cliente }
        });
        if (!cliente) {
            return res.status(404).json({
                msg: "El correo de cliente indicado no existe"
            });
        }
        return res.json(cliente);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getCliente = getCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_cliente } = req.params;
    try {
        const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
        if (!cliente) {
            return res.status(404).json({
                msg: "El correo " + correo_cliente + " de cliente no existe"
            });
        }
        yield cliente_1.Cliente.destroy({ where: { CORREO_CLIENTE: correo_cliente } });
        res.json({
            msg: "Se ha eliminado al cliente: " + correo_cliente
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con correo: " + correo_cliente,
            error
        });
    }
});
exports.deleteCliente = deleteCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_cliente } = req.params;
    try {
        const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
        if (!cliente) {
            return res.status(404).json({
                msg: "El correo " + correo_cliente + " de cliente no existe"
            });
        }
        const { contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        let updateData = {
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        };
        if (contrasena) {
            const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
            updateData.CONTRASENA = hashedPassword;
        }
        yield cliente_1.Cliente.update(updateData, { where: { CORREO_CLIENTE: correo_cliente } });
        res.json({
            msg: "Se ha actualizado al cliente: " + correo_cliente
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con correo: " + correo_cliente,
            error
        });
    }
});
exports.updateCliente = updateCliente;
