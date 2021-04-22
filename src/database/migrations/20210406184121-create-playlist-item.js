'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlist_item', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      playlist_uid: {
        type: Sequelize.CHAR(20),
        allowNull: false,
        references: { model: 'playlist', key: 'uid' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      episode_uid: {
        type: Sequelize.CHAR(20),
        allowNull: false,
        references: { model: 'episode', key: 'uid' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist_item')
  }
}

// sequelize db:migrate
