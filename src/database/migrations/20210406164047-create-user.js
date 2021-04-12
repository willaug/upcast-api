'use strict'

const Uid = require('../defaultFields/uid')
const Timestamp = require('../defaultFields/timestamp')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      ...Uid,
      username: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(70),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      url_photo: {
        type: Sequelize.STRING(60),
        allowNull: true,
        defaultValue: '/image/user/default.svg'
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  }
}

// sequelize db:migrate
