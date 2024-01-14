import mysql from 'mysql';

const init = () => { 
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'herU@1234',
        database:'sep'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
    });
    // Creating table
    connection.query(`CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        salary DECIMAL(10,2),
        position VARCHAR(255),
        join_date DATE
    )`, (err, result) => {
        if (err) throw err;
        console.log('Table created');
    });
    return connection;    
}

export default init;