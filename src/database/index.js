const Sequelize = require('sequelize')
const DB = require('../config/database')
const connection = new Sequelize(DB)

const User = require('../models/User')
const Category = require('../models/Category')
const ResetPassword = require('../models/ResetPassword')
const Show = require('../models/Show')

User.init(connection)
Category.init(connection)
ResetPassword.init(connection)
Show.init(connection)

ResetPassword.associate(connection.models)
Show.associate(connection.models)

module.exports = connection
