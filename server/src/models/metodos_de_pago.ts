import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const metodos_de_pago = sequelize.define(
    'metodos_de_pago',
    {
        COD_METODO_DE_PAGO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        TIPO: { type: DataTypes.STRING(255) },
        DETALLE: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);