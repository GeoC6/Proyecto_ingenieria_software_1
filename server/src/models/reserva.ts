import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Reserva = sequelize.define(
    'Reserva',
    {
        COD_RESERVA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        FECHA_CREACION: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        ESTADO: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
        TOTAL: { type: DataTypes.INTEGER },
        CELULAR_CLIENTE: { type: DataTypes.STRING(15) },
        NOMBRE_CLIENTE: { type: DataTypes.STRING(255) },
        APELLIDO_CLIENTE: { type: DataTypes.STRING(255) },
        DIRECCION_CLIENTE: { type: DataTypes.STRING(255) },
        CIUDAD_CLIENTE: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);