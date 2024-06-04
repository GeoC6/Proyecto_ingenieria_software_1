"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const sucursal_1 = require("./sucursal");
exports.Inventario = connection_1.default.define('inventario', {
    "COD_INVENTARIO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_SUCURSAL": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD_TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD_DISPONIBLE": { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Inventario.belongsTo(sucursal_1.Sucursal, { foreignKey: 'COD_SUCURSAL' });
