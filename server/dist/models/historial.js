"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historial = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Historial = connection_1.default.define('Historial', {
    "COD_HISTORIAL": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "FECHA_HISTORIAL": { type: sequelize_1.DataTypes.DATE }
}, {
    timestamps: false,
    freezeTableName: true
});
