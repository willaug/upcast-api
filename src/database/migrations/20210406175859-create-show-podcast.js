'use strict'

const Uid = require('../default_fields/uid')
const UserUid = require('../default_fields/user_uid')
const Timestamp = require('../default_fields/timestamp')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('show', {
      ...Uid,
      ...UserUid,
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'category', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      url_photo: {
        type: Sequelize.STRING(60)
      },
      description: {
        type: Sequelize.TEXT
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('show')
  }
}

// sequelize db:migrate
