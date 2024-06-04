"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disponibilidad_fecha = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const det_horario_entrega_1 = require("./det_horario_entrega");
exports.Disponibilidad_fecha = connection_1.default.define('Disponibilidad_fecha', {
    "COD_DISPONIBILIDAD": {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "FECHA_ENTREGA": {
        type: sequelize_1.DataTypes.DATE
    },
    "COD_HORARIO_ENTREGA": {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Disponibilidad_fecha.belongsTo(det_horario_entrega_1.Detalle_horario_entrega, { foreignKey: 'COD_HORARIO_ENTREGA' });
