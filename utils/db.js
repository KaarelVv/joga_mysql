const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',  //db if you want to run inside docker
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'qwerty', //12345
    database: process.env.MYSQL_DATABASE || 'joga_mysql',
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306
})

connection.connect((err) => {
    if(err) throw err
    console.log('MySQL server is connected')
})

module.exports = connection
