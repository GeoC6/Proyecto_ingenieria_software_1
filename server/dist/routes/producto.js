"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: './uploads' });
router.get('/list', producto_1.getProductos);
router.get('/:cod_producto',  producto_1.getProducto);
router.post('/',  upload.single('imagen'), producto_1.newProducto);
router.post('/:cod_producto/uploadImagen', auth_1.default, upload.single('imagen'), producto_1.uploadImagen);
router.delete('/:cod_producto', auth_1.default, producto_1.deleteProducto);
router.put('/:cod_producto',  producto_1.updateProducto);
router.patch('/agregar/:cod_producto',  producto_1.agregarProductos);
exports.default = router;
