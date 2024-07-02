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
exports.getTransaction = exports.getProducts = void 0;
const producto_1 = require("../models/producto");
const transbank_1 = require("../models/transbank");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProductos = yield producto_1.Producto.findAll();
        res.json(listProductos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});
exports.getProducts = getProducts;
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CODE } = req.body;
    try {
        const getTransaction = yield transbank_1.transbank.findOne({ where: { CODE: CODE } });
        res.json(getTransaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});
exports.getTransaction = getTransaction;
