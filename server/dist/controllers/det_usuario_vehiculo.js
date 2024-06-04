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
exports.deleteDetUsuarioVehiculo = exports.getDetUsuarioVehiculo = exports.getDetUsuarioVehiculos = exports.createDetUsuarioVehiculo = void 0;
const det_usuario_vehiculo_1 = require("../models/det_usuario_vehiculo");
const user_1 = require("../models/user");
const vehiculo_1 = require("../models/vehiculo");
// Crear una nueva relación entre usuario y vehículo
const createDetUsuarioVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { RUT_USUARIO, PATENTE_COD_VEHICULO } = req.body;
    try {
        // Verificar si el usuario y el vehículo existen antes de crear la relación
        const usuario = yield user_1.User.findOne({ where: { RUT_USUARIO } });
        const vehiculo = yield vehiculo_1.Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO } });
        if (!usuario || !vehiculo) {
            return res.status(400).json({
                msg: 'El usuario o el vehículo no existen'
            });
        }
        const detUsuarioVehiculo = yield det_usuario_vehiculo_1.Det_usuario_vehiculo.create({
            RUT_USUARIO,
            PATENTE_COD_VEHICULO
        });
        return res.json({
            msg: 'Relación entre usuario y vehículo creada correctamente',
            detUsuarioVehiculo
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
});
exports.createDetUsuarioVehiculo = createDetUsuarioVehiculo;
// Obtener todas las relaciones entre usuario y vehículo
const getDetUsuarioVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relaciones = yield det_usuario_vehiculo_1.Det_usuario_vehiculo.findAll({
        include: [
            { model: user_1.User, as: 'user' },
            { model: vehiculo_1.Vehiculo, as: 'vehiculo' }
        ]
    });
    res.json(relaciones);
});
exports.getDetUsuarioVehiculos = getDetUsuarioVehiculos;
// Obtener una relación entre usuario y vehículo por su código
const getDetUsuarioVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_USUARIO_VEHICULO } = req.params;
    const relacion = yield det_usuario_vehiculo_1.Det_usuario_vehiculo.findOne({
        where: { COD_USUARIO_VEHICULO },
        include: [
            { model: user_1.User, as: 'user' },
            { model: vehiculo_1.Vehiculo, as: 'vehiculo' }
        ]
    });
    if (!relacion) {
        return res.status(400).json({
            msg: "La relación entre usuario y vehículo con el código indicado no existe"
        });
    }
    try {
        return res.json(relacion);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getDetUsuarioVehiculo = getDetUsuarioVehiculo;
// Eliminar una relación entre usuario y vehículo por su código
const deleteDetUsuarioVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_USUARIO_VEHICULO } = req.params;
    const relacion = yield det_usuario_vehiculo_1.Det_usuario_vehiculo.findOne({
        where: { COD_USUARIO_VEHICULO },
        include: [
            { model: user_1.User, as: 'user' },
            { model: vehiculo_1.Vehiculo, as: 'vehiculo' }
        ]
    });
    if (!relacion) {
        return res.status(400).json({
            msg: "La relación entre usuario y vehículo con el código " + COD_USUARIO_VEHICULO + " no existe"
        });
    }
    try {
        yield det_usuario_vehiculo_1.Det_usuario_vehiculo.destroy({ where: { COD_USUARIO_VEHICULO } });
        res.json({
            msg: "Se ha eliminado la relación entre usuario y vehículo con código: " + COD_USUARIO_VEHICULO
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar la relación entre usuario y vehículo con código: " + COD_USUARIO_VEHICULO,
            error
        });
    }
});
exports.deleteDetUsuarioVehiculo = deleteDetUsuarioVehiculo;
