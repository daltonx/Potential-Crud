const express = require('express')
const router = require('./router')

const app = express()

app.use(express.json())
app.use(`/assets`, express.static(`${__dirname}/assets`))

app.use('/', router)
app.use((_, res, next) => {
    res.redirect('/')
    next()
})

app.listen(80, '127.0.0.1')
exports.app = app