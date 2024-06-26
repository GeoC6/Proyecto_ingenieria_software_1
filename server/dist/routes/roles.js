"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', auth_1.default, rol_1.getRol);
router.post('/', auth_1.default, rol_1.newRol);
router.get('/:cod_rol', auth_1.default, rol_1.getOneRol);
router.delete('/:cod_rol', auth_1.default, rol_1.deleteRol);
router.put('/:cod_rol', auth_1.default, rol_1.updateRol);
exports.default = router;
