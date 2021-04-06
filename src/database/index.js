const Sequelize = require('sequelize')
const DB = require('../config/database')
const connection = new Sequelize(DB)

const User = require('../models/User')

User.init(connection)

module.exports = connection
