const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'vww24010',
  user: 'root',
  database: 'todolist',
  host: 'localhost',
  port: '3306'
})

let note = {}

note.list = (active) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM notes WHERE is_active = ${active}`
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.add = (title, content) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.changeActive = (id, active) => {
  return new Promise((resolve, reject) => {
    // const sql = `DELETE FROM notes WHERE id = ${id}`;
    const sql = `UPDATE notes SET is_active = ${active} WHERE id = ${id}`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.delete = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM notes WHERE id = ${id}`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
module.exports = note;
