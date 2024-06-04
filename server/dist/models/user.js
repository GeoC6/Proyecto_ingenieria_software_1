"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = require("./rol");
exports.User = connection_1.default.define('Usuarios', {
    "RUT_USUARIO": { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    "CONTRASEÑA": { type: sequelize_1.DataTypes.STRING },
    "NOMBRE_USUARIO": { type: sequelize_1.DataTypes.STRING },
    "APELLIDO1_USUARIO": { type: sequelize_1.DataTypes.STRING },
    "APELLIDO2_USUARIO": { type: sequelize_1.DataTypes.STRING },
    "COD_ROL": { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.User.belongsTo(rol_1.Rol, { foreignKey: 'COD_ROL' });
