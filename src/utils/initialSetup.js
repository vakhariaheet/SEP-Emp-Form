const mysql = require('mysql');

const init = () => { 
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
    });
    // Create table
    connection.query("CREATE TABLE IF NOT EXISTS EmpInfo (id VARCHAR(255), name VARCHAR(255), salary INT(10), join_date DATE, position VARCHAR(255))", (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });

    return connection;    
}

module.exports = init;