const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty', //12345
    database: 'joga_mysql'
})

connection.connect((err) => {
    if(err) throw err
    console.log('MySQL server is connected')
    // let sql = 'INSERT INTO customers (name, address) VALUES'
    // ('John', 'Highway 71');
    // connection.query(sql, (err, result) =>{
    //     console.log(result)
    //     if(err) throw err
    //     console.log('Number of records inserted: ' + result.affectedRows)
    // })
})

module.exports = connection