const { Model, DataTypes } = require('sequelize')

class Playlist extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(20),
        primaryKey: true
      },
      title: DataTypes.STRING(45)
    }, { sequelize, tableName: 'playlist' })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_uid', as: 'user' })
    this.belongsToMany(models.Episode, {
      foreignKey: 'playlist_uid',
      through: 'playlist_item',
      as: 'episode'
    })
  }
}

module.exports = Playlist
