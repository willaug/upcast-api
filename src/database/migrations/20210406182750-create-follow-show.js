'use strict'

const UserUid = require('../default_fields/user_uid')
const ShowUid = require('../default_fields/show_uid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('follow', {
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
    await queryInterface.dropTable('follow')
  }
}

// sequelize db:migrate
