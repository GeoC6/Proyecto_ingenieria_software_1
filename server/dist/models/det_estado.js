"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.det_estado = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.det_estado = connection_1.default.define('det_estado', {
    "COD_DET_ESTADO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_ESTADO": { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false,
    freezeTableName: true
});
