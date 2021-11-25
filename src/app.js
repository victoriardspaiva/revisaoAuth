//nucleo das aplicações necessarias
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const database = require('./database/config')

const user = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

/* rotas */
app.use('/api/users', user)

database.connect()

module.exports = app