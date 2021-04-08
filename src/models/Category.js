const { Model, DataTypes } = require('sequelize')

class Category extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: DataTypes.STRING(45),
      slug: DataTypes.STRING(60)
    }, { sequelize, tableName: 'category' })
  }

  static associate (models) {
    this.hasMany(models.Show, { foreignKey: 'category_id', as: 'show' })
  }
}

module.exports = Category
