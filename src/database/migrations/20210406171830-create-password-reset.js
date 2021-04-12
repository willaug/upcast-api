'use strict'

const Timestamp = require('../defaultFields/timestamp')
const UserUid = require('../defaultFields/userUid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('password_reset', {
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
        defaultValue: Sequelize.literal('TIMESTAMPADD(HOUR, 12, CURRENT_TIMESTAMP)')
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('password_reset')
  }
}

// sequelize db:migrate
