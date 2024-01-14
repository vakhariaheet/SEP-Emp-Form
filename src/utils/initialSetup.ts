import mysql from 'mysql';

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
    connection.query('use sep');
    return connection;    
}

export default init;