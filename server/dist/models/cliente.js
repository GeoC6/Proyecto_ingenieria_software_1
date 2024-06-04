"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = require("./rol");
exports.Cliente = connection_1.default.define('Cliente', {
    COD_CLIENTE: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CORREO_CLIENTE: { type: sequelize_1.DataTypes.INTEGER },
    CELULAR_CLIENTE: { type: sequelize_1.DataTypes.STRING(15) },
    COD_ROL: { type: sequelize_1.DataTypes.INTEGER },
    NOMBRE_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
    APELLIDO_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
    DIRECCION_CLIENTE: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Cliente.belongsTo(rol_1.Rol, { foreignKey: 'COD_ROL' });
