const Sequelize = require('sequelize')

module.exports = {
  show_uid: {
    type: Sequelize.CHAR(20),
    allowNull: false,
    references: { model: 'show', key: 'uid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}
