'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category')
  }
}

// sequelize db:migrate
