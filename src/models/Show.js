const { Model, DataTypes } = require('sequelize')

class Show extends Model {
  static init (sequelize) {
    super.init({
      uid: {
        type: DataTypes.CHAR(20),
        primaryKey: true
      },
      title: DataTypes.STRING(45),
      url_photo: DataTypes.STRING(80),
      description: DataTypes.TEXT
    }, { sequelize, tableName: 'show' })
  }

  static associate (models) {
    this.hasMany(models.Episode, { foreignKey: 'show_uid', as: 'episodes' })
    this.belongsTo(models.User, { foreignKey: 'user_uid', as: 'author' })
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' })
    this.belongsToMany(models.User, { foreignKey: 'show_uid', through: 'follow_show', as: 'followers' })
  }
}

module.exports = Show
