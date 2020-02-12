const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'R6L82KIAWH',
  user: 'uBatXCETA8',
  database: 'uBatXCETA8',
  host: 'remotemysql.com',
  port: '3306'
})

module.exports = pool;
