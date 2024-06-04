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
exports.updateVehiculo = exports.deleteVehiculo = exports.getVehiculo = exports.getVehiculos = exports.newVehiculo = void 0;
const vehiculo_1 = require("../models/vehiculo");
const newVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente_cod_vehiculo, marca, modelo, color, ano } = req.body;
    const vehiculo = yield vehiculo_1.Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
    if (vehiculo) {
        return res.status(400).json({
            msg: 'Ya existe un vehículo con esa patente'
        });
    }
    try {
        yield vehiculo_1.Vehiculo.create({
            PATENTE_COD_VEHICULO: patente_cod_vehiculo,
            MARCA: marca,
            MODELO: modelo,
            COLOR: color,
            ANO: ano
        });
        return res.status(201).json({
            msg: 'Vehículo creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
});
exports.newVehiculo = newVehiculo;
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listVehiculos = yield vehiculo_1.Vehiculo.findAll({
        attributes: ['PATENTE_COD_VEHICULO', 'MARCA', 'MODELO', 'COLOR', 'ANO']
    });
    res.json(listVehiculos);
});
exports.getVehiculos = getVehiculos;
const getVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = yield vehiculo_1.Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente indicada no existe"
        });
    }
    try {
        return res.json(vehiculo);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getVehiculo = getVehiculo;
const deleteVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = yield vehiculo_1.Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente " + patente_cod_vehiculo + " no existe"
        });
    }
    try {
        yield vehiculo_1.Vehiculo.destroy({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
        res.json({
            msg: "Se ha eliminado el vehículo con patente: " + patente_cod_vehiculo
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el vehículo con patente: " + patente_cod_vehiculo,
            error
        });
    }
});
exports.deleteVehiculo = deleteVehiculo;
const updateVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = yield vehiculo_1.Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente " + patente_cod_vehiculo + " no existe"
        });
    }
    try {
        const { marca, modelo, color, ano } = req.body;
        yield vehiculo_1.Vehiculo.update({
            MARCA: marca,
            MODELO: modelo,
            COLOR: color,
            ANO: ano
        }, { where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
        res.json({
            msg: "Se ha actualizado el vehículo con patente: " + patente_cod_vehiculo
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el vehículo con patente: " + patente_cod_vehiculo,
            error
        });
    }
});
exports.updateVehiculo = updateVehiculo;
