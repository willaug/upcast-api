'use strict'

const Timestamp = require('../default_fields/timestamp')
const UserUid = require('../default_fields/user_uid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reset_password', {
      uid: {
        type: Sequelize.CHAR(36),
        primaryKey: true
      },
      ...UserUid,
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reset_password')
  }
}

// sequelize db:migrate
