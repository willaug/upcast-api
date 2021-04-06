'use strict'

const Uid = require('../default_fields/uid')
const Timestamp = require('../default_fields/timestamp')
const ShowUid = require('../default_fields/show_uid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('episode', {
      ...Uid,
      ...ShowUid,
      title: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      url_audio: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      url_thumbnail: {
        type: Sequelize.STRING(60)
      },
      description: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.TIME,
        allowNull: false
      },
      ...Timestamp
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('episode')
  }
}

// sequelize db:migrate
