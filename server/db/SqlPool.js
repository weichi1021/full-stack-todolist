const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   password: 'R6L82KIAWH',
//   user: 'uBatXCETA8',
//   database: 'uBatXCETA8',
//   host: 'remotemysql.com',
//   port: '3306'
// })

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   password: 'vww24010',
//   user: 'root',
//   database: 'todolist',
//   host: 'localhost',
//   port: '3306',
// })

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'miracat0303',
  user: 'miracat0303',
  database: 'miracat0303',
  host: 'db4free.net',
  port: '3306',
})

module.exports = pool;
