const dotEnv = require('dotenv').config()
const dotEnvExpand = require('dotenv-expand')
dotEnvExpand(dotEnv)

require('./database')

const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => console.log(`Server running on ${process.env.HOST}`))
