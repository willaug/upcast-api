'use strict'

const Uid = require('../defaultFields/uid')
const Timestamp = require('../defaultFields/timestamp')
const ShowUid = require('../defaultFields/showUid')

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
        type: Sequelize.STRING(80),
        allowNull: false
      },
      url_thumbnail: {
        type: Sequelize.STRING(80)
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
