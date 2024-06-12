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
exports.createTransaction = void 0;
const webpayService_1 = __importDefault(require("../services/webpayService"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    try {
        const response = yield webpayService_1.default.createTransaction(buyOrder, sessionId, amount, returnUrl);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});
exports.createTransaction = createTransaction;
const commitTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("1111111111111111111111111111");
    const { token } = req.body;
    try {
        const response = yield webpayService_1.default.commitTransaction(token);
        if (response.response_code === 0 && response.status === 'AUTHORIZED') {
            res.status(200).json({ message: 'Transacción exitosa', details: response });
        }
        else {
            res.status(400).json({ error: 'Transacción no autorizada', details: response });
        }
    }
    catch (error) {
        console.error('Error en commitTransaction:', error);
        res.status(500).json({ error: 'Failed to commit transaction', details: error });
    }
});
exports.commitTransaction = commitTransaction;
