
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Producto = sequelize.define('producto', {
    "COD_PRODUCTO": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_PRODUCTO": { type: DataTypes.STRING },
    "PRECIO_PRODUCTO": { type: DataTypes.INTEGER },
    "CANTIDAD_TOTAL": { type: DataTypes.INTEGER },
    "CANTIDAD_DISPONIBLE": { type: DataTypes.INTEGER },
    "IMAGEN": { type: DataTypes.STRING }
},
    {
        freezeTableName: true,
        timestamps: false,

    }
);