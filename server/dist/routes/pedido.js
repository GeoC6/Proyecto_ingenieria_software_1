"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_1 = require("../controllers/pedido"); // Ajusta la ruta según tu estructura
const router = (0, express_1.Router)();
// Obtener todos los pedidos
router.get('/', pedido_1.getPedidos);
// Obtener un pedido por ID
router.get('/:cod_pedido', pedido_1.getPedido);
// Crear un nuevo pedido
router.post('/', pedido_1.newPedido);
// Actualizar un pedido por ID
router.put('/:cod_pedido', pedido_1.updatePedido);
// Eliminar un pedido por ID
router.delete('/:cod_pedido', pedido_1.deletePedido);
exports.default = router;
