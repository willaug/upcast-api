'use strict'

const Uid = require('../default_fields/uid')
const UserUid = require('../default_fields/user_uid')
const Timestamp = require('../default_fields/timestamp')

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
