const { Model, DataTypes } = require('sequelize')

class ResetPassword extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(36),
        primaryKey: true
      },
      used: DataTypes.TINYINT
    }, { sequelize, tableName: 'reset_password' })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_uid', as: 'user' })
  }
}

module.exports = ResetPassword
