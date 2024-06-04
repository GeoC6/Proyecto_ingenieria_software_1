"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_marca_vehiculo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Detalle_marca_vehiculo = connection_1.default.define('Detalle_marca_vehiculos', {
    "COD_MARCA_VEHICULO": {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    "NOMBRE_MARCA_VEHICULO": {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
