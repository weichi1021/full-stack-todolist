const pool = require('../server/db/SqlPool.js')

let note = {}

note.create = (title, content) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.read = (active) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, title, content FROM notes WHERE is_active = ${active};`
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.update = (id, title, content) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE notes SET title = '${title}', content = '${content}' WHERE id = ${id};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.delete = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM notes WHERE id = ${id};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.changeActive = (id, active) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE notes SET is_active = ${active} WHERE id = ${id}`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.bindTag = (nid, tid) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO relation (nid, tid) VALUES (${nid}, ${tid});`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.undoTag = (nid) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM relation WHERE nid = ${nid};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
note.getNoteByTid = (tid) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT r.nid AS id, n.title, n.content FROM relation AS r LEFT JOIN notes AS n ON n.id = r.nid WHERE r.tid = ${tid};`
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}

module.exports = note;
