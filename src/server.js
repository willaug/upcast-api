const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000
require('./database')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => console.log(`Server running on port ${port}`))
