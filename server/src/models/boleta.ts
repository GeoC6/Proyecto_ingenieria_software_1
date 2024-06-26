import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { pagos } from './pagos';
import { Cliente } from './cliente';

export const boleta = sequelize.define(
    'boleta',
    {
        COD_BOLETA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_CLIENTE: { type: DataTypes.INTEGER },
        COD_PAGO: { type: DataTypes.INTEGER },
        TRANSACTION_DATE: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        AMOUNT: { type: DataTypes.INTEGER },
        STATUS: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

boleta.belongsTo(pagos, { foreignKey: 'COD_PAGO' });
boleta.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' });