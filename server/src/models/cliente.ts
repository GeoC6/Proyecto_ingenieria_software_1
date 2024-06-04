import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Rol } from './rol';

export const Cliente = sequelize.define(
    'Cliente',
    {
        COD_CLIENTE: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        CORREO_CLIENTE: { type: DataTypes.INTEGER },
        CELULAR_CLIENTE: { type: DataTypes.STRING(15) },
        COD_ROL: { type: DataTypes.INTEGER },
        NOMBRE_CLIENTE: { type: DataTypes.STRING(255) },
        APELLIDO_CLIENTE: { type: DataTypes.STRING(255) },
        DIRECCION_CLIENTE: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Cliente.belongsTo(Rol, { foreignKey: 'COD_ROL' });
