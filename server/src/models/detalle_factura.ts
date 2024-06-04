import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Facturas } from './facturas';

export const Detalle_Factura = sequelize.define(
    'Detalle_Factura',
    {
        COD_DETALLE_FACTURA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_FACTURA: { type: DataTypes.INTEGER },
        CANTIDAD: { type: DataTypes.INTEGER },
        SUBTOTAL: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Detalle_Factura.belongsTo(Facturas, { foreignKey: 'COD_FACTURA' });

