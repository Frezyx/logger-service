require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/loger_routes')
const telegramRoutes = require('./routes/telegram_routes')
var bodyParser = require('body-parser')


const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use('/logs', routes)
app.use('/telegram-bot', telegramRoutes)

async function start() {
    const env = process.env
    const dbLink = `${env.dbLogin}:${env.dbPassword}${env.clusterName}/${env.dbName}`
    try {
        await mongoose.connect(
            `mongodb+srv://${dbLink}?retryWrites=true&w=majority&ssl=true`,
            {
                useNewUrlParser: true,
                useFindAndModify: false
            }
        )
        app.listen(app.get('port'), () => {
        console.log(`Logger started on http://localhost:${app.get('port')}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()