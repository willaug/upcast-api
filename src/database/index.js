const Sequelize = require('sequelize')
const DB = require('../config/database')
const connection = new Sequelize(DB)

const User = require('../models/User')
const Playlist = require('../models/Playlist')
const Episode = require('../models/Episode')
const Category = require('../models/Category')
const ResetPassword = require('../models/ResetPassword')
const Show = require('../models/Show')

User.init(connection)
Show.init(connection)
Episode.init(connection)
Playlist.init(connection)
Category.init(connection)
ResetPassword.init(connection)

User.associate(connection.models)
Show.associate(connection.models)
Episode.associate(connection.models)
Playlist.associate(connection.models)
Category.associate(connection.models)
ResetPassword.associate(connection.models)

module.exports = connection
