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

app.listen(3000)
console.log('Potential CRUD RUNNING ON http://localhost:3000')
exports.app = app