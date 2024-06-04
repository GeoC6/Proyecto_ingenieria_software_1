"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const facturas_1 = require("./facturas");
const metodos_de_pago_1 = require("./metodos_de_pago");
const deposito_1 = require("./deposito");
exports.pagos = connection_1.default.define('pagos', {
    COD_PAGO: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COD_FACTURA: { type: sequelize_1.DataTypes.INTEGER },
    COD_METODO_DE_PAGO: { type: sequelize_1.DataTypes.INTEGER },
    COD_BANCO: { type: sequelize_1.DataTypes.INTEGER },
    FECHA_DE_PAGO: { type: sequelize_1.DataTypes.DATEONLY, defaultValue: sequelize_1.DataTypes.NOW },
    MONTO_PAGADO: { type: sequelize_1.DataTypes.INTEGER },
    METODO_PAGO: { type: sequelize_1.DataTypes.STRING(255) },
    CONFIRMACION_PAGO: { type: sequelize_1.DataTypes.STRING(255) },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.pagos.belongsTo(facturas_1.Facturas, { foreignKey: 'COD_PAGO' });
exports.pagos.belongsTo(metodos_de_pago_1.metodos_de_pago, { foreignKey: 'COD_PAGO' });
exports.pagos.belongsTo(deposito_1.deposito, { foreignKey: 'COD_PAGO' });
