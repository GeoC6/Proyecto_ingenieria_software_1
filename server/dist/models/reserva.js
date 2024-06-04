"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Reserva = connection_1.default.define('Reserva', {
    COD_RESERVA: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FECHA_CREACION: { type: sequelize_1.DataTypes.DATEONLY, defaultValue: sequelize_1.DataTypes.NOW },
    ESTADO: { type: sequelize_1.DataTypes.STRING, defaultValue: 'Pendiente' },
    TOTAL: { type: sequelize_1.DataTypes.INTEGER },
    CELULAR_CLIENTE: { type: sequelize_1.DataTypes.STRING(15) },
    NOMBRE_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
    APELLIDO_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
    DIRECCION_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
    CIUDAD_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
