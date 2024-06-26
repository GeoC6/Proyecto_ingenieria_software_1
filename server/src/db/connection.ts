import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('aqua', 'root', '1234', {   // esto se edita segun como tengan nombrado su esquema, usuario y contraseña en su base de datos

    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;


