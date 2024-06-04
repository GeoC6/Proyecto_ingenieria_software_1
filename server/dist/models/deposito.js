"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.deposito = connection_1.default.define('deposito', {
    COD_BANCO: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    NOMBRE_BANCO: { type: sequelize_1.DataTypes.STRING(255) },
    NUMERO_DE_CUENTA: { type: sequelize_1.DataTypes.INTEGER },
}, {
    freezeTableName: true,
    timestamps: false,
});
