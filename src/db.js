// src/db.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // default XAMPP MySQL user
  password: '', // default XAMPP MySQL password
  database: 'signup1'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
