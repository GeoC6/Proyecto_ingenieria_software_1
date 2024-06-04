
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Rol = sequelize.define('rol',{
    "COD_ROL": {type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    "NOMBRE_ROL": {type: DataTypes.STRING}

},
{
    freezeTableName: true,
    timestamps: false,

}
)

