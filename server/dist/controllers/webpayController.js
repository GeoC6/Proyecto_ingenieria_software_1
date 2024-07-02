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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTransaction = exports.commitTransaction = exports.createTransaction = void 0;
const webpayService_1 = __importDefault(require("../services/webpayService"));
const transbank_1 = require("../models/transbank");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, returnUrl, cod_cliente } = req.body;
    try {
        const fechaActual = new Date().toISOString().split('T')[0];
        const codigo = new Date().valueOf().toString();
        const nuevaBoleta = yield transbank_1.transbank.create({
            COD_CLIENTE: cod_cliente,
            TRANSACTION_DATE: fechaActual,
            AMOUNT: amount,
            STATUS: 'Pendiente',
            CODE: codigo,
        });
        const response = yield webpayService_1.default.createTransaction(codigo, codigo, amount, returnUrl);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});
exports.createTransaction = createTransaction;
const commitTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const response = yield webpayService_1.default.commitTransaction(token);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to commit transaction' });
    }
});
exports.commitTransaction = commitTransaction;
const responseTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token_ws;
    if (!token) {
        res.redirect('http://localhost:4200/web/response?status=error');
        return;
    }
    const response = yield fetch('http://localhost:3000/webpay/commit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });
    const data = yield response.json();
    if (data.response_code == 0) { // TRANSACCIÓN CORRECTA
        yield transbank_1.transbank.update({
            STATUS: 'Confirmado',
        }, { where: { CODE: data.buy_order } });
        res.redirect(`http://localhost:4200/web/response?status=confirm&order=${data.buy_order}`);
    }
    else { // FALLO LA TRANSACCIÓN
        yield transbank_1.transbank.update({
            STATUS: 'Rechazado',
        }, { where: { CODE: data.buy_order } });
        res.redirect(`http://localhost:4200/web/response?status=error&order=${data.buy_order}`);
    }
    return;
});
exports.responseTransaction = responseTransaction;
