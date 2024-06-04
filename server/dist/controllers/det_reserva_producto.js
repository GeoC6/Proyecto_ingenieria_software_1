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
exports.deletePedido = exports.updatePedido = exports.newPedido = exports.getPedido = exports.getPedidos = void 0;
const det_reserva_producto_1 = require("../models/det_reserva_producto"); // Asegúrate de tener la ruta correcta
const reserva_1 = require("../models/reserva"); // Asegúrate de tener la ruta correcta
const producto_1 = require("../models/producto"); // Asegúrate de tener la ruta correcta
// Obtener todos los pedidos
const getPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidos = yield det_reserva_producto_1.Detalle_reserva_producto.findAll({
            include: [
                { model: reserva_1.Reserva, attributes: ['COD_RESERVA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_PEDIDO', 'CANTIDAD']
        });
        res.json(pedidos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos.' });
    }
});
exports.getPedidos = getPedidos;
// Obtener un pedido por ID
const getPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_pedido } = req.params;
    try {
        const pedido = yield det_reserva_producto_1.Detalle_reserva_producto.findByPk(cod_pedido, {
            include: [
                { model: reserva_1.Reserva, attributes: ['COD_RESERVA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (pedido) {
            res.json(pedido);
        }
        else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pedido.' });
    }
});
exports.getPedido = getPedido;
// Crear un nuevo pedido
const newPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto, cod_reserva, cantidad } = req.body;
    try {
        const pedidoCreado = yield det_reserva_producto_1.Detalle_reserva_producto.create({
            COD_PRODUCTO: cod_producto,
            COD_RESERVA: cod_reserva,
            CANTIDAD: cantidad
        });
        res.json(pedidoCreado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pedido.' });
    }
});
exports.newPedido = newPedido;
// Actualizar un pedido por ID
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_pedido } = req.params;
    const { cod_producto, cod_reserva, cantidad } = req.body;
    try {
        const pedido = yield det_reserva_producto_1.Detalle_reserva_producto.findByPk(cod_pedido);
        if (pedido) {
            yield pedido.update({
                COD_PRODUCTO: cod_producto,
                COD_RESERVA: cod_reserva,
                CANTIDAD: cantidad
            });
            res.json(pedido);
        }
        else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el pedido.' });
    }
});
exports.updatePedido = updatePedido;
// Eliminar un pedido por ID
const deletePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_pedido } = req.params;
    try {
        const pedido = yield det_reserva_producto_1.Detalle_reserva_producto.findByPk(cod_pedido);
        if (pedido) {
            yield pedido.destroy();
            res.json({ mensaje: 'Pedido eliminado correctamente.' });
        }
        else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pedido.' });
    }
});
exports.deletePedido = deletePedido;
