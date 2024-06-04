import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const datos_de_tarjeta = sequelize.define(
    'datos_de_tarjeta',
    {
        NUMERO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        FECHA_DE_VENCIMIENTO: { type: DataTypes.INTEGER },
        CVC: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);