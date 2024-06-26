"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boleta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const pagos_1 = require("./pagos");
const cliente_1 = require("./cliente");
exports.boleta = connection_1.default.define('boleta', {
    COD_BOLETA: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_CLIENTE: { type: sequelize_1.DataTypes.INTEGER },
    COD_PAGO: { type: sequelize_1.DataTypes.INTEGER },
    TRANSACTION_DATE: { type: sequelize_1.DataTypes.DATEONLY, defaultValue: sequelize_1.DataTypes.NOW },
    AMOUNT: { type: sequelize_1.DataTypes.INTEGER },
    STATUS: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.boleta.belongsTo(pagos_1.pagos, { foreignKey: 'COD_PAGO' });
exports.boleta.belongsTo(cliente_1.Cliente, { foreignKey: 'COD_CLIENTE' });
