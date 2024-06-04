import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Producto } from './producto';

export const Carrito = sequelize.define(
    'Carrito',
    {
        COD_CARRITO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_PRODUCTO: { type: DataTypes.INTEGER },
        COSTO_TOTAL: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Carrito.belongsTo(Producto, { foreignKey: 'COD_PRODUCTO' });