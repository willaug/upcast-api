'use strict'

const Uid = require('../defaultFields/uid')
const UserUid = require('../defaultFields/userUid')
const Timestamp = require('../defaultFields/timestamp')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlist', {
      ...Uid,
      title: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      ...UserUid,
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist')
  }
}

// sequelize db:migrate
