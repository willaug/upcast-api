const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(20),
        primaryKey: true
      },
      username: DataTypes.STRING(40),
      email: DataTypes.STRING(70),
      password: DataTypes.STRING(120),
      url_photo: DataTypes.STRING(60),
      role: DataTypes.TINYINT()
    }, { sequelize, tableName: 'user' })
  }
}

module.exports = User
