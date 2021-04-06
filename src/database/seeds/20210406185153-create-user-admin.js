'use strict'

const bcrypt = require('bcrypt')
const nanoid = NanoIDLength => require('../../config/config_nanoid')(NanoIDLength)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uid = await nanoid(20)()
    const password = await bcrypt.hash('admin', 10)

    await queryInterface.bulkInsert('user', [
      {
        uid,
        username: 'Upcast',
        email: 'contact@upcast.com',
        password,
        role: 1
      }
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {})
  }
}
