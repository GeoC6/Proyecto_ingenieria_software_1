import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { pagos } from './pagos';

export const transaccion = sequelize.define(
    'transaccion',
    {
        COD_TRANSACCION: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_PAGO: { type: DataTypes.INTEGER },
        FECHA_PAGO: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        ESTADO_TRANSACCION: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

transaccion.belongsTo(pagos, { foreignKey: 'COD_PAGO' });