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
exports.uploadImagen = exports.agregarProductos = exports.deleteProducto = exports.getProducto = exports.updateProducto = exports.newProducto = exports.getProductos = void 0;
const producto_1 = require("../models/producto");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProductos = yield producto_1.Producto.findAll();
        res.json(listProductos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});
exports.getProductos = getProductos;
const newProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto, precio, cantidad_total, cantidad_disponible } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
        yield producto_1.Producto.create({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO_PRODUCTO: precio,
            CANTIDAD_TOTAL: cantidad_total,
            CANTIDAD_DISPONIBLE: cantidad_disponible,
            IMAGEN: imagen // Nueva columna para la ruta de la imagen
        });
        return res.status(201).json({
            msg: 'Producto creado correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el producto',
            error
        });
    }
});
exports.newProducto = newProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id del producto no existe"
        });
    }
    try {
        const { nombre_producto, precio, cantidad_total, cantidad_disponible, imagen } = req.body;
        yield producto_1.Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO_PRODUCTO: precio,
            CANTIDAD_TOTAL: cantidad_total,
            CANTIDAD_DISPONIBLE: cantidad_disponible,
            IMAGEN: imagen
        }, { where: { COD_PRODUCTO: cod_producto } });
        return res.json({
            msg: 'Producto ' + cod_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        });
    }
});
exports.updateProducto = updateProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        });
    }
    try {
        return res.json(idProducto);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el producto: ' + cod_producto,
            error
        });
    }
});
exports.getProducto = getProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        });
    }
    try {
        yield producto_1.Producto.destroy({ where: { COD_PRODUCTO: cod_producto } });
        return res.json({
            msg: 'Producto de id ' + cod_producto + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        });
    }
});
exports.deleteProducto = deleteProducto;
const agregarProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const { cantidad } = req.body;
    // Verificar si el producto existe
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        });
    }
    try {
        const cantidadInt = parseInt(cantidad, 10);
        const cantidades = yield producto_1.Producto.findOne({ attributes: ['CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_PRODUCTO: cod_producto } });
        const cantidadDisponible = (cantidades === null || cantidades === void 0 ? void 0 : cantidades.dataValues.CANTIDAD_DISPONIBLE) + cantidadInt;
        const cantidadTotal = cantidades === null || cantidades === void 0 ? void 0 : cantidades.dataValues.CANTIDAD_TOTAL;
        if (cantidadDisponible > cantidadTotal) {
            return res.status(400).json({
                msg: 'Has superado la máxima capacidad de Stock',
            });
        }
        // Actualizar la cantidad disponible
        yield producto_1.Producto.update({
            CANTIDAD_DISPONIBLE: cantidadDisponible,
        }, { where: { COD_PRODUCTO: cod_producto } });
        return res.json({
            msg: `Se han añadido ${cantidad} de productos`
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
const uploadImagen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const imagen_url = req.file ? req.file.path : null;
    try {
        const producto = yield producto_1.Producto.findOne({ where: { cod_producto } });
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        yield producto_1.Producto.update({
            IMAGEN: imagen_url
        }, { where: { COD_PRODUCTO: cod_producto } });
        return res.json({ msg: 'Imagen del producto actualizada correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la imagen del producto',
            error
        });
    }
});
exports.uploadImagen = uploadImagen;
