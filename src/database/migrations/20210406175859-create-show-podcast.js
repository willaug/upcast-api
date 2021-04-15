'use strict'

const Uid = require('../defaultFields/uid')
const UserUid = require('../defaultFields/userUid')
const Timestamp = require('../defaultFields/timestamp')

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
        type: Sequelize.STRING(60),
        defaultValue: '/images/shows/default.svg'
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
