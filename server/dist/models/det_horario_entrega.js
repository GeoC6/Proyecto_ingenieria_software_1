"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_horario_entrega = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Detalle_horario_entrega = connection_1.default.define('DETALLE_HORARIO_ENTREGA', {
    "COD_HORARIO_ENTREGA": {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "HORA_ENTREGA": {
        type: sequelize_1.DataTypes.TIME
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
