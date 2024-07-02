"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('aqua', 'root', '1532', {
    // esto se edita segun como tengan nombrado su esquema, usuario y contraseña en su base de datos
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
