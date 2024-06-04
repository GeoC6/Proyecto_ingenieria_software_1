"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Producto = connection_1.default.define('producto', {
    "COD_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_PRODUCTO": { type: sequelize_1.DataTypes.STRING },
    "PRECIO_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD_TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD_DISPONIBLE": { type: sequelize_1.DataTypes.INTEGER },
    "IMAGEN": { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
