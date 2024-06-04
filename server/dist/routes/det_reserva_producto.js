"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const det_reserva_producto_1 = require("../controllers/det_reserva_producto"); // Ajusta la ruta según tu estructura
const router = (0, express_1.Router)();
// Obtener todos los pedidos
router.get('/', det_reserva_producto_1.getPedidos);
// Obtener un pedido por ID
router.get('/:cod_pedido', det_reserva_producto_1.getPedido);
// Crear un nuevo pedido
router.post('/', det_reserva_producto_1.newPedido);
// Actualizar un pedido por ID
router.put('/:cod_pedido', det_reserva_producto_1.updatePedido);
// Eliminar un pedido por ID
router.delete('/:cod_pedido', det_reserva_producto_1.deletePedido);
exports.default = router;
