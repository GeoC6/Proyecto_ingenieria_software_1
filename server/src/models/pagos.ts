import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Facturas } from './facturas';
import { metodos_de_pago } from './metodos_de_pago';
import { deposito } from './deposito';

export const pagos = sequelize.define(
    'pagos',
    {
        COD_PAGO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_FACTURA: { type: DataTypes.INTEGER },
        COD_METODO_DE_PAGO: { type: DataTypes.INTEGER },
        COD_BANCO: { type: DataTypes.INTEGER },
        FECHA_DE_PAGO: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        MONTO_PAGADO: { type: DataTypes.INTEGER },
        METODO_PAGO: { type: DataTypes.STRING(255) },
        CONFIRMACION_PAGO: { type: DataTypes.STRING(255) },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

pagos.belongsTo(Facturas, { foreignKey: 'COD_PAGO' });
pagos.belongsTo(metodos_de_pago, { foreignKey: 'COD_PAGO' });
pagos.belongsTo(deposito, { foreignKey: 'COD_PAGO' });