"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Vehiculo = connection_1.default.define('Vehiculo', {
    "PATENTE_COD_VEHICULO": { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    "MARCA": { type: sequelize_1.DataTypes.STRING },
    "MODELO": { type: sequelize_1.DataTypes.STRING },
    "COLOR": { type: sequelize_1.DataTypes.STRING },
    "ANO": { type: sequelize_1.DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true
});
