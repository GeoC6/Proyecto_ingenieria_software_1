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
const transbank_sdk_1 = require("transbank-sdk");
const createTransaction = (buyOrder, sessionId, amount, returnUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = new transbank_sdk_1.WebpayPlus.Transaction(new transbank_sdk_1.Options(transbank_sdk_1.IntegrationCommerceCodes.WEBPAY_PLUS, transbank_sdk_1.IntegrationApiKeys.WEBPAY, transbank_sdk_1.Environment.Integration));
    try {
        const response = yield tx.create(buyOrder, sessionId, amount, returnUrl);
        return response;
    }
    catch (error) {
        console.error('ERROR creating transaction:', error);
        throw error;
    }
});
const commitTransaction = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = new transbank_sdk_1.WebpayPlus.Transaction(new transbank_sdk_1.Options(transbank_sdk_1.IntegrationCommerceCodes.WEBPAY_PLUS, transbank_sdk_1.IntegrationApiKeys.WEBPAY, transbank_sdk_1.Environment.Integration));
    try {
        const response = yield tx.commit(token);
        return response;
    }
    catch (error) {
        console.error('ERROR committing transaction:', error);
        throw error;
    }
});
exports.default = {
    createTransaction,
    commitTransaction
};
