// const mysql = require('mysql2')

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345',
//     database: 'joga_mysql'
// })

// con.connect((err) => {
//     if(err) throw err
//     console.log('MySQL server is connected')
    
//     let sql = "INSERT INTO customer (name, address) VALUES ('John', 'Highway 71')"
//     ;
//     con.query(sql, (err, result) =>{
//         console.log(result)
//         if(err) throw err
//         console.log('Number of records inserted: ' + result.affectedRows)
//     })
// })

// module.exports = con