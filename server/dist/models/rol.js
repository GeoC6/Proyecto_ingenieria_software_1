"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Rol = connection_1.default.define('rol', {
    "COD_ROL": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_ROL": { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
