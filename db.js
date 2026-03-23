// db.js — MySQL connection config
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // change to your MySQL username
  password: '',        // change to your MySQL password
  database: 'taskr_db' // run setup.sql first to create this
});

db.connect(err => {
  if (err) { console.error('MySQL connection failed:', err); process.exit(1); }
  console.log('MySQL connected ✓');
});

module.exports = db;
