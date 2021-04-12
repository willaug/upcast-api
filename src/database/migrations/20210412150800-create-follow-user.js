'use strict'

const foreignKeyField = {
  type: Sequelize.CHAR(20),
  allowNull: false,
  references: { model: 'user', key: 'uid' },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('follow_user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      follower_uid: foreignKeyField,
      following_uid: foreignKeyField
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('follow_user')
  }
}

// sequelize db:migrate
