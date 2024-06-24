"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Cliente = connection_1.default.define('Cliente', {
    COD_CLIENTE: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CORREO_CLIENTE: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    CONTRASENA: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    CELULAR_CLIENTE: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    NOMBRE_CLIENTE: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    APELLIDO_CLIENTE: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    DIRECCION_CLIENTE: { type: sequelize_1.DataTypes.STRING(255), allowNull: false }
}, {
    freezeTableName: true,
    timestamps: false,
});
