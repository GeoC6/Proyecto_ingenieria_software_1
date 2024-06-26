"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const producto_1 = require("./producto");
const cliente_1 = require("./cliente");
exports.Carrito = connection_1.default.define('Carrito', {
    COD_CARRITO: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_CLIENTE: { type: sequelize_1.DataTypes.INTEGER },
    COD_PRODUCTO: { type: sequelize_1.DataTypes.INTEGER },
    COSTO_TOTAL: { type: sequelize_1.DataTypes.INTEGER },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Carrito.belongsTo(producto_1.Producto, { foreignKey: 'COD_PRODUCTO' });
exports.Carrito.belongsTo(cliente_1.Cliente, { foreignKey: 'COD_CLIENTE' });
