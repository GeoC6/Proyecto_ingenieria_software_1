"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_Factura = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const facturas_1 = require("./facturas");
exports.Detalle_Factura = connection_1.default.define('Detalle_Factura', {
    COD_DETALLE_FACTURA: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_FACTURA: { type: sequelize_1.DataTypes.INTEGER },
    CANTIDAD: { type: sequelize_1.DataTypes.INTEGER },
    SUBTOTAL: { type: sequelize_1.DataTypes.INTEGER },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Detalle_Factura.belongsTo(facturas_1.Facturas, { foreignKey: 'COD_FACTURA' });
