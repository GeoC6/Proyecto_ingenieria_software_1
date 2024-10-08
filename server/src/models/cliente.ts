import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Rol } from './rol';

export const Cliente = sequelize.define(
    'Cliente',
    {
        COD_CLIENTE: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        CORREO_CLIENTE: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        CONTRASENA: { type: DataTypes.STRING(255), allowNull: false },
        CELULAR_CLIENTE: { type: DataTypes.STRING(15), allowNull: false },
        NOMBRE_CLIENTE: { type: DataTypes.STRING(255), allowNull: false },
        APELLIDO_CLIENTE: { type: DataTypes.STRING(255), allowNull: false },
        DIRECCION_CLIENTE: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);