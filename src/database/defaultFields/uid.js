const Sequelize = require('sequelize')

module.exports = {
  uid: {
    type: Sequelize.CHAR(20),
    primaryKey: true
  }
}
