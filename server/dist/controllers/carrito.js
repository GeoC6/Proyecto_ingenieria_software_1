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
exports.deleteCarrito = exports.updateCarrito = exports.newCarrito = exports.getCarritos = void 0;
const carrito_1 = require("../models/carrito");
const getCarritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaCarritos = yield carrito_1.Carrito.findAll();
        res.json(listaCarritos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los carritos.' });
    }
});
exports.getCarritos = getCarritos;
const newCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_PRODUCTO, COSTO_TOTAL } = req.body;
    try {
        yield carrito_1.Carrito.create({
            COD_PRODUCTO,
            COSTO_TOTAL,
        });
        return res.status(201).json({
            msg: 'Carrito creado correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el carrito',
            error,
        });
    }
});
exports.newCarrito = newCarrito;
const updateCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_CARRITO } = req.params;
    const { COD_PRODUCTO, COSTO_TOTAL } = req.body;
    try {
        const carrito = yield carrito_1.Carrito.findByPk(COD_CARRITO);
        if (!carrito) {
            return res.status(404).json({
                msg: 'Carrito no encontrado',
            });
        }
        yield carrito.update({
            COD_PRODUCTO,
            COSTO_TOTAL,
        });
        return res.json({
            msg: 'Carrito actualizado correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al actualizar el carrito',
            error,
        });
    }
});
exports.updateCarrito = updateCarrito;
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { COD_CARRITO } = req.params;
    try {
        const carrito = yield carrito_1.Carrito.findByPk(COD_CARRITO);
        if (!carrito) {
            return res.status(404).json({
                msg: 'Carrito no encontrado',
            });
        }
        yield carrito.destroy();
        return res.json({
            msg: 'Carrito eliminado correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al eliminar el carrito',
            error,
        });
    }
});
exports.deleteCarrito = deleteCarrito;
