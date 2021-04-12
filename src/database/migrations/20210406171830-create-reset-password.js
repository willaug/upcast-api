'use strict'

const Timestamp = require('../defaultFields/timestamp')
const UserUid = require('../defaultFields/userUid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reset_password', {
      uid: {
        type: Sequelize.CHAR(50),
        primaryKey: true
      },
      ...UserUid,
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      expiration: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 12 HOUR') // test
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reset_password')
  }
}

// sequelize db:migrate
