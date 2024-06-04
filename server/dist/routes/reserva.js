"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.post('/', reserva_1.newReserva);
router.get('/list', auth_1.default, reserva_1.getReservas);
router.get('/:cod_reserva', reserva_1.getReserva);
router.put('/:cod_reserva', auth_1.default, reserva_1.updateReserva);
router.delete('/:cod_reserva', auth_1.default, reserva_1.deleteReserva);
router.get('/estado/:estado', reserva_1.getReservasByEstado);
router.get('/ciudad/:ciudad', auth_1.default, reserva_1.getReservasByCiudad);
router.post('/reporte/masvendido', auth_1.default, auth_1.default, reserva_1.getMasVendido);
router.post('/reporte/ventaspormes', auth_1.default, reserva_1.getVentasPorMes);
router.get('/reporte/diamasvendido', auth_1.default, reserva_1.getDiaMasVendido);
router.get('/generarpdf/:id', reserva_1.pdfReserva);
exports.default = router;
