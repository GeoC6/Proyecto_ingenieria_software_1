"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucursal = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Sucursal = connection_1.default.define('Sucursal', {
    "COD_SUCURSAL": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_SUCURSAL": { type: sequelize_1.DataTypes.STRING },
    "COD_CIUDAD_SUCURSAL": { type: sequelize_1.DataTypes.INTEGER },
    "CALLE_SUCURSAL": { type: sequelize_1.DataTypes.STRING },
    "NRO_DIRECCION_SUCURSAL": { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false,
    freezeTableName: true
});
