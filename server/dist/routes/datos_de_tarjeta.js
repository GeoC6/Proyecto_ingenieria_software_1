"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datos_de_tarjeta_1 = require("../controllers/datos_de_tarjeta");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Obtener todos los datos de tarjeta
router.get('/list', datos_de_tarjeta_1.getAllDatosTarjeta);
// Obtener un dato de tarjeta por su ID
router.get('/:numero', datos_de_tarjeta_1.getDatoTarjeta);
// Crear un nuevo dato de tarjeta
router.post('/', datos_de_tarjeta_1.createDatoTarjeta);
// Actualizar un dato de tarjeta por su ID
router.put('/:numero', datos_de_tarjeta_1.updateDatoTarjeta);
// Eliminar un dato de tarjeta por su ID
router.delete('/:numero', datos_de_tarjeta_1.deleteDatoTarjeta);
exports.default = router;
