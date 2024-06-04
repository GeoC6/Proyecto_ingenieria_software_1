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
exports.deleteSucursal = exports.getSucursal = exports.updateSucursal = exports.newSucursal = exports.getSucursales = void 0;
const sucursal_1 = require("../models/sucursal");
const getSucursales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSucursal = yield sucursal_1.Sucursal.findAll();
    res.json(listSucursal);
});
exports.getSucursales = getSucursales;
const newSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_sucursal, cod_ciudad_sucursal, calle_sucursal, nro_direccion_sucursal } = req.body;
    try {
        yield sucursal_1.Sucursal.create({
            "NOMBRE_SUCURSAL": nombre_sucursal,
            "COD_CIUDAD_SUCURSAL": cod_ciudad_sucursal,
            "CALLE_SUCURSAL": calle_sucursal,
            "NRO_DIRECCION_SUCURSAL": nro_direccion_sucursal
        });
        return res.json({
            msg: 'Sucursal creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear la sucursal',
            error
        });
    }
});
exports.newSucursal = newSucursal;
const updateSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_sucursal } = req.params;
    const { nombre_sucursal, cod_ciudad_sucursal, calle_sucursal, nro_direccion_sucursal } = req.body;
    const idSucursal = yield sucursal_1.Sucursal.findOne({ where: { COD_SUCURSAL: cod_sucursal } });
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id de la sucursal no existe"
        });
    }
    try {
        yield sucursal_1.Sucursal.update({
            NOMBRE_SUCURSAL: nombre_sucursal,
            COD_CIUDAD_SUCURSAL: cod_ciudad_sucursal,
            CALLE_SUCURSAL: calle_sucursal,
            NRO_DIRECCION_SUCURSAL: nro_direccion_sucursal
        }, { where: { COD_SUCURSAL: cod_sucursal } });
        return res.json({
            msg: 'Sucursal ' + cod_sucursal + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la sucursal: ' + cod_sucursal,
            error
        });
    }
});
exports.updateSucursal = updateSucursal;
const getSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_sucursal } = req.params;
    const idSucursal = yield sucursal_1.Sucursal.findOne({ where: { COD_SUCURSAL: cod_sucursal } });
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id: " + cod_sucursal + " de sucursal no existe"
        });
    }
    try {
        res.json(idSucursal);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la sucursal: ' + cod_sucursal,
            error
        });
    }
});
exports.getSucursal = getSucursal;
const deleteSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_sucursal } = req.params;
    const idSucursal = yield sucursal_1.Sucursal.findOne({ where: { COD_SUCURSAL: cod_sucursal } });
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id: " + cod_sucursal + " de sucursal no existe"
        });
    }
    try {
        yield sucursal_1.Sucursal.destroy({ where: { COD_SUCURSAL: cod_sucursal } });
        return res.json({
            msg: 'sucursal con id ' + cod_sucursal + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la sucursal: ' + cod_sucursal,
            error
        });
    }
});
exports.deleteSucursal = deleteSucursal;
