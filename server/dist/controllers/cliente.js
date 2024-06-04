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
const rol_1 = require("../models/rol");
const sequelize_1 = __importDefault(require("sequelize"));
const newCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_cliente, celular_cliente, cod_rol, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
    const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
    if (cliente) {
        return res.status(400).json({
            msg: 'Ya existe un cliente con ese correo'
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(celular_cliente, 10);
    try {
        yield cliente_1.Cliente.create({
            CORREO_CLIENTE: correo_cliente,
            CELULAR_CLIENTE: hashedPassword,
            COD_ROL: cod_rol,
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
                'DIRECCION_CLIENTE',
                [sequelize_1.default.col('Rol_Usuario.NOMBRE_ROL'), 'NOMBRE_ROL']
            ],
            include: {
                model: rol_1.Rol,
                attributes: [],
            }
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
    const { correo_cliente, celular_cliente } = req.body;
    // Validación de cliente
    const cliente = yield cliente_1.Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });
    if (!cliente) {
        return res.status(401).json({
            msg: 'El correo ingresado no es válido'
        });
    }
    // Validación de contraseña
    const passwordValida = yield bcrypt_1.default.compare(celular_cliente, cliente.CELULAR_CLIENTE);
    if (!passwordValida) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        });
    }
    // Generar token
    const codRol = cliente.dataValues.COD_ROL;
    const token = jsonwebtoken_1.default.sign({
        correo_cliente: correo_cliente,
        role: codRol
    }, process.env.SECRET_KEY || 'PRUEBA1');
    res.json({ token, rol: codRol });
});
exports.loginCliente = loginCliente;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_cliente } = req.params;
    const idCliente = yield cliente_1.Cliente.findOne({
        attributes: [
            'COD_CLIENTE',
            'CORREO_CLIENTE',
            'CELULAR_CLIENTE',
            'NOMBRE_CLIENTE',
            'APELLIDO_CLIENTE',
            'DIRECCION_CLIENTE',
            [sequelize_1.default.col('Rol_Usuario.NOMBRE_ROL'), 'NOMBRE_ROL']
        ],
        include: {
            model: rol_1.Rol,
            attributes: []
        }, where: { COD_CLIENTE: cod_cliente }
    });
    if (!idCliente) {
        return res.status(404).json({
            msg: "El código de cliente indicado no existe"
        });
    }
    try {
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
    const idCliente = yield cliente_1.Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });
    if (!idCliente) {
        return res.status(404).json({
            msg: "El código " + cod_cliente + " de cliente no existe"
        });
    }
    try {
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
    const idCliente = yield cliente_1.Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });
    if (!idCliente) {
        return res.status(404).json({
            msg: "El código " + cod_cliente + " de cliente no existe"
        });
    }
    try {
        const { correo_cliente, celular_cliente, cod_rol, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        if (celular_cliente != null) {
            const hashedPassword = yield bcrypt_1.default.hash(celular_cliente, 10);
            yield cliente_1.Cliente.update({
                CORREO_CLIENTE: correo_cliente,
                CELULAR_CLIENTE: hashedPassword,
                COD_ROL: cod_rol,
                NOMBRE_CLIENTE: nombre_cliente,
                APELLIDO_CLIENTE: apellido_cliente,
                DIRECCION_CLIENTE: direccion_cliente
            }, { where: { COD_CLIENTE: cod_cliente } });
            res.json({
                msg: "Se ha actualizado al cliente: " + cod_cliente
            });
        }
        else {
            yield cliente_1.Cliente.update({
                CORREO_CLIENTE: correo_cliente,
                COD_ROL: cod_rol,
                NOMBRE_CLIENTE: nombre_cliente,
                APELLIDO_CLIENTE: apellido_cliente,
                DIRECCION_CLIENTE: direccion_cliente
            }, { where: { COD_CLIENTE: cod_cliente } });
            res.json({
                msg: "Se ha actualizado al cliente: " + cod_cliente
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con código: " + cod_cliente,
            error
        });
    }
});
exports.updateCliente = updateCliente;
