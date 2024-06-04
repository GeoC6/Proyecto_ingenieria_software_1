"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleReserva = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const reserva_1 = require("./reserva");
const producto_1 = require("./producto");
exports.DetalleReserva = connection_1.default.define('DetalleReserva', {
    COD_DETALLE_RESERVA: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_RESERVA: { type: sequelize_1.DataTypes.INTEGER },
    COD_PRODUCTO: { type: sequelize_1.DataTypes.INTEGER },
    CANTIDAD: { type: sequelize_1.DataTypes.INTEGER },
    SUBTOTAL: { type: sequelize_1.DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true
});
exports.DetalleReserva.belongsTo(reserva_1.Reserva, { foreignKey: 'COD_RESERVA' });
exports.DetalleReserva.belongsTo(producto_1.Producto, { foreignKey: 'COD_PRODUCTO' });
