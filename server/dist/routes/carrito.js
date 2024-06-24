"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrito_1 = require("../controllers/carrito");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', auth_1.default, carrito_1.getCarritos);
router.post('/', auth_1.default, carrito_1.newCarrito);
router.put('/:cod_carrito', auth_1.default, carrito_1.updateCarrito);
router.delete('/:cod_carrito', auth_1.default, carrito_1.deleteCarrito);
exports.default = router;
