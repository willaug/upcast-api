'use strict'

const UserUid = require('../defaultFields/userUid')
const ShowUid = require('../defaultFields/showUid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('follow_show', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ...UserUid,
      ...ShowUid
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('follow_show')
  }
}

// sequelize db:migrate
