const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require(__dirname + '/../config/config.js')
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

for(const file of fs.readdirSync(__dirname)) {
  if(file == basename) continue
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
  db[model.name] = model
}

db.sequelize = sequelize 
db.Sequelize = Sequelize

module.exports = db