import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';


export const Facturas = sequelize.define(
    'Facturas',
    {
        COD_FACTURA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_CLIENTE: { type: DataTypes.INTEGER },
        FECHA_EMISION: { type: DataTypes.INTEGER },
        FECHA_VENCIMIENTO: { type: DataTypes.INTEGER },
        MONTO_TOTAL: { type: DataTypes.INTEGER },
        ESTADO: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Facturas.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' });