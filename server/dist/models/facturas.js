"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facturas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cliente_1 = require("./cliente");
exports.Facturas = connection_1.default.define('Facturas', {
    COD_FACTURA: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_CLIENTE: { type: sequelize_1.DataTypes.INTEGER },
    FECHA_EMISION: { type: sequelize_1.DataTypes.INTEGER },
    FECHA_VENCIMIENTO: { type: sequelize_1.DataTypes.INTEGER },
    MONTO_TOTAL: { type: sequelize_1.DataTypes.INTEGER },
    ESTADO: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Facturas.belongsTo(cliente_1.Cliente, { foreignKey: 'COD_CLIENTE' });
