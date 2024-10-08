import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';

export const pagos = sequelize.define(
    'pagos',
    {
        COD_PAGO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_CLIENTE: { type: DataTypes.INTEGER },
        BUY_ORDER: { type: DataTypes.INTEGER },
        TRANSACTION_DATE: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        AMOUNT: { type: DataTypes.INTEGER },
        STATUS: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

pagos.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' });