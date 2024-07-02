"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carro_1 = require("../controllers/carro");
const router = (0, express_1.Router)();
router.get('/products', carro_1.getProducts);
router.post('/transaction', carro_1.getTransaction);
exports.default = router;
