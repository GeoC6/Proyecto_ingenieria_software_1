"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo cliente
router.post('/', cliente_1.createCliente);
// Ruta para obtener la lista de clientes
router.get('/list', cliente_1.getClientes);
// Ruta para obtener un cliente por su número de celular
router.get('/:CELULAR_CLIENTE', cliente_1.getCliente);
// Ruta para eliminar un cliente por su número de celular
router.delete('/:CELULAR_CLIENTE', cliente_1.deleteCliente);
// Ruta para actualizar los datos de un cliente por su número de celular
router.put('/:CELULAR_CLIENTE', cliente_1.updateCliente);
exports.default = router;
