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
exports.getInventarios = exports.getInventario = exports.quitarProductos = exports.agregarProductos = exports.updateInventario = exports.newInventario = void 0;
const inventario_1 = require("../models/inventario");
const producto_1 = require("../models/producto");
const sequelize_1 = __importDefault(require("sequelize"));
const sucursal_1 = require("../models/sucursal");
const newInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_sucursal, cantidad_total } = req.body;
    try {
        yield inventario_1.Inventario.create({
            "COD_SUCURSAL": cod_sucursal,
            "CANTIDAD_TOTAL": cantidad_total,
            "CANTIDAD_DISPONIBLE": cantidad_total
        });
        return res.json({
            msg: 'Inventario creado'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el inventario',
            error
        });
    }
});
exports.newInventario = newInventario;
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const idInventario = yield producto_1.Producto.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id del inventario no existe"
        });
    }
    try {
        const { cantidad_total } = req.body;
        yield inventario_1.Inventario.update({
            CANTIDAD_DISPONIBLE: cantidad_total
        }, { where: { COD_INVENTARIO: cod_inventario } });
        return res.json({
            msg: 'Se ha actualizado el maximo del inventario a ' + cantidad_total
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el inventario: ' + cod_inventario,
            error
        });
    }
});
exports.updateInventario = updateInventario;
const agregarProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const { cod_producto, cantidad } = req.body;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        });
    }
    const idInventario = yield inventario_1.Inventario.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El inventario no existe"
        });
    }
    try {
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt + 1; i++) {
            const cantidades = yield inventario_1.Inventario.findOne({ attributes: ['CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_INVENTARIO: cod_inventario } });
            const cantidadDisponible = (cantidades === null || cantidades === void 0 ? void 0 : cantidades.dataValues.CANTIDAD_DISPONIBLE) + 1;
            const cantidadTotal = cantidades === null || cantidades === void 0 ? void 0 : cantidades.dataValues.CANTIDAD_TOTAL;
            if (cantidadDisponible > cantidadTotal) {
                return res.status(400).json({
                    msg: 'Has superado la maxima capacidad del inventario',
                });
            }
            yield inventario_1.Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
            }, { where: { COD_INVENTARIO: cod_inventario } });
        }
        return res.json({
            msg: "Se han añadido " + cantidad + " de productos"
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al añadir los productos',
            error
        });
    }
});
exports.agregarProductos = agregarProductos;
const quitarProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const { cod_producto, cantidad } = req.body;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        });
    }
    const idInventario = yield inventario_1.Inventario.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El inventario no existe"
        });
    }
    try {
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt + 1; i++) {
            const cantidades = yield inventario_1.Inventario.findOne({ attributes: ['CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_INVENTARIO: cod_inventario } });
            const cantidadDisponible = (cantidades === null || cantidades === void 0 ? void 0 : cantidades.dataValues.CANTIDAD_DISPONIBLE) - 1;
            if (cantidadDisponible < 0) {
                return res.status(400).json({
                    msg: 'Inventario vacio',
                });
            }
            yield inventario_1.Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
            }, { where: { COD_INVENTARIO: cod_inventario } });
        }
        return res.json({
            msg: "Se han quitado " + cantidad + " de productos"
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al quitar los productos',
            error
        });
    }
});
exports.quitarProductos = quitarProductos;
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const idInventario = yield inventario_1.Inventario.findOne({
        attributes: [
            'COD_INVENTARIO',
            'CANTIDAD_TOTAL',
            'CANTIDAD_DISPONIBLE',
            [sequelize_1.default.col('Sucursal.NOMBRE_SUCURSAL'), 'NOMBRE_SUCURSAL']
        ],
        include: {
            model: sucursal_1.Sucursal,
            attributes: []
        }, where: { COD_INVENTARIO: cod_inventario }
    });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id: " + cod_inventario + " de inventario no existe"
        });
    }
    try {
        return res.json(idInventario);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el inventario: ' + cod_inventario,
            error
        });
    }
});
exports.getInventario = getInventario;
const getInventarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listInventarios = yield inventario_1.Inventario.findAll({
        attributes: [
            'COD_INVENTARIO',
            'CANTIDAD_TOTAL',
            'CANTIDAD_DISPONIBLE',
            [sequelize_1.default.col('Sucursal.NOMBRE_SUCURSAL'), 'NOMBRE_SUCURSAL']
        ],
        include: {
            model: sucursal_1.Sucursal,
            attributes: []
        }
    });
    res.json(listInventarios);
});
exports.getInventarios = getInventarios;
