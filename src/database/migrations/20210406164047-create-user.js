'use strict'

const Uid = require('../default_fields/uid')
const Timestamp = require('../default_fields/timestamp')

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
      role: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  }
}

// sequelize db:migrate
