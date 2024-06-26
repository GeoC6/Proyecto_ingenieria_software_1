import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Producto } from './producto';
import { Cliente } from './cliente';

export const Carrito = sequelize.define(
    'Carrito',
    {
        COD_CARRITO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_CLIENTE: { type: DataTypes.INTEGER },
        COD_PRODUCTO: { type: DataTypes.INTEGER },
        COSTO_TOTAL: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Carrito.belongsTo(Producto, { foreignKey: 'COD_PRODUCTO' });
Carrito.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' });