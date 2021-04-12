const Sequelize = require('sequelize')

module.exports = {
  user_uid: {
    type: Sequelize.CHAR(20),
    allowNull: false,
    references: { model: 'user', key: 'uid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}
