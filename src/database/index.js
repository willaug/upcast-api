const Sequelize = require('sequelize')
const DB = require('../config/database')

const User = require('../models/User')
const Playlist = require('../models/Playlist')
const Episode = require('../models/Episode')
const Category = require('../models/Category')
const PasswordReset = require('../models/PasswordReset')
const Show = require('../models/Show')

const connection = new Sequelize(DB)

User.init(connection)
Show.init(connection)
Episode.init(connection)
Playlist.init(connection)
Category.init(connection)
PasswordReset.init(connection)

User.associate(connection.models)
Show.associate(connection.models)
Episode.associate(connection.models)
Playlist.associate(connection.models)
Category.associate(connection.models)
PasswordReset.associate(connection.models)

module.exports = connection
