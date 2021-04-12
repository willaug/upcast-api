'use strict'

const Timestamp = require('../defaultFields/timestamp')
const UserUid = require('../defaultFields/userUid')

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
