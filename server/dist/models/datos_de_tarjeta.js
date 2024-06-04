"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datos_de_tarjeta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.datos_de_tarjeta = connection_1.default.define('datos_de_tarjeta', {
    NUMERO: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FECHA_DE_VENCIMIENTO: { type: sequelize_1.DataTypes.INTEGER },
    CVC: { type: sequelize_1.DataTypes.INTEGER },
}, {
    freezeTableName: true,
    timestamps: false,
});
