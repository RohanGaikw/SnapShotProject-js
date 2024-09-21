const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'snapshots'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports = {
    saveSnapshot: (name, description, callback) => {
        const query = 'INSERT INTO snapshots (name, description) VALUES (?, ?)';
        connection.query(query, [name, description], callback);
    },

    getSnapshots: (callback) => {
        const query = 'SELECT * FROM snapshots';
        connection.query(query, callback);
    }
};

