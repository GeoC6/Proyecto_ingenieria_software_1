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
                'COD_CLIENTE',
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
    const { correo_cliente, contrasena } = req.body;
    if (!correo_cliente || !contrasena) {
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios' });
    }
    try {
        const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
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
        res.json({ token });
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
    const { cod_cliente } = req.params;
    try {
        const idCliente = yield cliente_1.Cliente.findOne({
            attributes: [
                'COD_CLIENTE',
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE'
            ],
            where: { COD_CLIENTE: cod_cliente }
        });
        if (!idCliente) {
            return res.status(404).json({
                msg: "El código de cliente indicado no existe"
            });
        }
        return res.json(idCliente);
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
    const { cod_cliente } = req.params;
    try {
        const idCliente = yield cliente_1.Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });
        if (!idCliente) {
            return res.status(404).json({
                msg: "El código " + cod_cliente + " de cliente no existe"
            });
        }
        yield cliente_1.Cliente.destroy({ where: { COD_CLIENTE: cod_cliente } });
        res.json({
            msg: "Se ha eliminado al cliente: " + cod_cliente
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con código: " + cod_cliente,
            error
        });
    }
});
exports.deleteCliente = deleteCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_cliente } = req.params;
    try {
        const idCliente = yield cliente_1.Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });
        if (!idCliente) {
            return res.status(404).json({
                msg: "El código " + cod_cliente + " de cliente no existe"
            });
        }
        const { correo_cliente, contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        let updateData = {
            CORREO_CLIENTE: correo_cliente,
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        };
        if (contrasena) {
            const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
            updateData.CONTRASENA = hashedPassword;
        }
        yield cliente_1.Cliente.update(updateData, { where: { COD_CLIENTE: cod_cliente } });
        res.json({
            msg: "Se ha actualizado al cliente: " + cod_cliente
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con código: " + cod_cliente,
            error
        });
    }
});
exports.updateCliente = updateCliente;
