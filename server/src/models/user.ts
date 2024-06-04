import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Rol } from './rol';

export const User = sequelize.define('Usuarios',{
    "RUT_USUARIO": {type: DataTypes.STRING,primaryKey: true},
    "CONTRASEÑA": {type: DataTypes.STRING},
    "NOMBRE_USUARIO": {type: DataTypes.STRING},
    "APELLIDO1_USUARIO": {type: DataTypes.STRING},
    "APELLIDO2_USUARIO": {type: DataTypes.STRING},
    "COD_ROL": {type: DataTypes.INTEGER}
        

},
{
    timestamps: false,
    freezeTableName: true
});

User.belongsTo(Rol, { foreignKey: 'COD_ROL' });