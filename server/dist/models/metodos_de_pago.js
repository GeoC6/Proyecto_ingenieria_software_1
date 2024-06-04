"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodos_de_pago = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.metodos_de_pago = connection_1.default.define('metodos_de_pago', {
    COD_METODO_DE_PAGO: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TIPO: { type: sequelize_1.DataTypes.STRING(255) },
    DETALLE: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
