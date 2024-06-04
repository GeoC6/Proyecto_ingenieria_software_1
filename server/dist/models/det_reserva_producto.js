"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_reserva_producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const reserva_1 = require("./reserva");
const producto_1 = require("./producto");
exports.Detalle_reserva_producto = connection_1.default.define('Detalle_reserva_producto', {
    "COD_PEDIDO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER },
    "COD_RESERVA": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD": { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Detalle_reserva_producto.belongsTo(reserva_1.Reserva, { foreignKey: 'COD_RESERVA' });
exports.Detalle_reserva_producto.belongsTo(producto_1.Producto, { foreignKey: 'COD_PRODUCTO' });
