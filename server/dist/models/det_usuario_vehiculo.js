"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Det_usuario_vehiculo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
const vehiculo_1 = require("./vehiculo");
exports.Det_usuario_vehiculo = connection_1.default.define('det_usuario_vehiculo', {
    "COD_USUARIO_VEHICULO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    "RUT_USUARIO": { type: sequelize_1.DataTypes.STRING },
    "PATENTE_COD_VEHICULO": { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Det_usuario_vehiculo.belongsTo(user_1.User, { foreignKey: 'RUT_USUARIO', as: 'user' });
exports.Det_usuario_vehiculo.belongsTo(vehiculo_1.Vehiculo, { foreignKey: 'PATENTE_COD_VEHICULO', as: 'vehiculo' });
