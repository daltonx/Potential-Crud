const {
    DB_USERNAME = 'root',
    DB_PASSWORD = 'root',
    DB_DATABASE = 'crud_test',
    DB_HOST = '127.0.0.1'
} = process.env

module.exports = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
}