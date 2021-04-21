const { Model, DataTypes } = require('sequelize')

class Episode extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(20),
        primaryKey: true
      },
      title: DataTypes.STRING(45),
      url_audio: DataTypes.STRING(80),
      description: DataTypes.TEXT,
      duration: DataTypes.TIME
    }, { sequelize, tableName: 'episode' })
  }

  static associate (models) {
    this.belongsTo(models.Show, { foreignKey: 'show_uid', as: 'show' })
    this.belongsToMany(models.Playlist, {
      foreignKey: 'episode_uid',
      through: 'playlist_item',
      as: 'playlist'
    })
  }
}

module.exports = Episode
