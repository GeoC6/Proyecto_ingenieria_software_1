"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ciudad_sucursal = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Ciudad_sucursal = connection_1.default.define('Ciudad_sucursal', {
    "COD_CIUDAD_SUCURSAL": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_CIUDAD": { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false,
    freezeTableName: true
});
