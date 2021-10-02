const express = require("express")
const DeveloperController = require('./controllers/developer')

const router = express.Router()

router.get('/developers', DeveloperController.list)

router.get('/developers/:id', DeveloperController.get)

router.post('/developers', DeveloperController.create)

router.put('/developers/:id', DeveloperController.update)

router.delete('/developers/:id', DeveloperController.delete)

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

module.exports = router