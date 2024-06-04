import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('aqua', 'root', 'admin', {   // esto se edita segun como tengan nombrado su esquema, usuario y contraseña en su base de datos

    host: 'localhost',
    dialect: 'mysql',
});
 
export default sequelize;  


