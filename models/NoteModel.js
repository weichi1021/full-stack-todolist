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
note.read = async (active) => {
  return await new Promise((resolve, reject) => {
    const sql = `SELECT n.id, n.title, n.content, GROUP_CONCAT('{"id":', t.id, ',"display_name":"', t.display_name, '"} ') AS tags FROM notes n LEFT JOIN relation r ON n.id = r.nid LEFT JOIN note_tags t ON t.id = r.tid WHERE is_active = ${active} GROUP BY n.id ORDER BY n.id;`
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
    const sql = `SELECT n.id, n.title, n.content, GROUP_CONCAT('{"id":', t.id, ',"display_name":"', t.display_name, '"} ') AS tags FROM notes n LEFT JOIN relation r ON n.id = r.nid LEFT JOIN note_tags t ON t.id = r.tid WHERE r.tid = ${tid} AND is_active = 1 GROUP BY n.id ORDER BY n.id;`
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}

module.exports = note;
