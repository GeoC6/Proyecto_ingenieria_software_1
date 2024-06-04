"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaccion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const pagos_1 = require("./pagos");
exports.transaccion = connection_1.default.define('transaccion', {
    COD_TRANSACCION: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_PAGO: { type: sequelize_1.DataTypes.INTEGER },
    FECHA_PAGO: { type: sequelize_1.DataTypes.DATEONLY, defaultValue: sequelize_1.DataTypes.NOW },
    ESTADO_TRANSACCION: { type: sequelize_1.DataTypes.STRING, defaultValue: 'Pendiente' },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.transaccion.belongsTo(pagos_1.pagos, { foreignKey: 'COD_PAGO' });
