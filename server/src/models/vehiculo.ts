import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';

export const Vehiculo = sequelize.define('Vehiculo', {
    "PATENTE_COD_VEHICULO": { type: DataTypes.STRING, primaryKey: true },
    "MARCA": { type: DataTypes.STRING },
    "MODELO": { type: DataTypes.STRING },
    "COLOR": { type: DataTypes.STRING },
    "ANO": { type: DataTypes.INTEGER },

},
    {
        timestamps: false,
        freezeTableName: true
    });
