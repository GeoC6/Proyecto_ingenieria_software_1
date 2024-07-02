import { DataTypes } from 'sequelize'
import sequelize from '../db/connection'
import { Cliente } from './cliente'

export const transbank = sequelize.define(
  'transbank',
  {
    ID_TRANSACCION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    COD_CLIENTE: { type: DataTypes.INTEGER },
    TRANSACTION_DATE: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    AMOUNT: { type: DataTypes.INTEGER },
    STATUS: { type: DataTypes.STRING(255) },
    CODE: { type: DataTypes.STRING(255) },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

transbank.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' })
