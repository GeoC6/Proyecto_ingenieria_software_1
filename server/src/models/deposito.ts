import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const deposito = sequelize.define(
    'deposito',
    {
        COD_BANCO: { type: DataTypes.INTEGER, primaryKey: true },
        NOMBRE_BANCO: { type: DataTypes.STRING(255) },
        NUMERO_DE_CUENTA: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);