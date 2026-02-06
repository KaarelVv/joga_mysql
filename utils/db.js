const mysql = require('mysql2')

class Database {
    constructor(config = {}) {
        const resolvedConfig = {
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || 'qwerty',
            database: process.env.MYSQL_DATABASE || 'joga_mysql',
            port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
            ...config
        }

        this.connection = mysql.createConnection(resolvedConfig)
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(err)
                    return
                }
                console.log('MySQL server is connected')
                resolve()
            })
        })
    }

    getConnection() {
        return this.connection
    }
}

module.exports = Database
