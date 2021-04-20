const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(20),
        primaryKey: true
      },
      username: DataTypes.STRING(40),
      email: {
        type: DataTypes.STRING(70),
        unique: true
      },
      password: DataTypes.STRING(120),
      url_photo: DataTypes.STRING(60)
    }, { sequelize, tableName: 'user' })
  }

  static associate (models) {
    this.hasMany(models.ResetPassword, { foreignKey: 'user_uid', as: 'passwordReset' })
    this.hasMany(models.Show, { foreignKey: 'user_uid', as: 'userShow' })
    this.hasMany(models.Playlist, { foreignKey: 'user_uid', as: 'userPlaylist' })

    this.belongsToMany(models.Show, { foreignKey: 'user_uid', through: 'follow_show', as: 'following' })
  }
}

module.exports = User
