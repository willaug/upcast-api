const { Model, DataTypes } = require('sequelize')

class ResetPassword extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(50),
        primaryKey: true
      },
      used: DataTypes.TINYINT
    }, { sequelize, tableName: 'password_reset' })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_uid', as: 'user' })
  }
}

module.exports = ResetPassword
