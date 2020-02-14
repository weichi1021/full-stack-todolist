const pool = require('../server/db/SqlPool.js')

let tag = {}

tag.create = (display_name) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO note_tags (display_name) VALUES ('${display_name}');`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.read = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM note_tags;`
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.update = (id, display_name) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE note_tags SET display_name = '${display_name}' WHERE id = ${id};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.delete = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM note_tags WHERE id = ${id};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.find = (display_name) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM note_tags WHERE display_name = '${display_name}';`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.isExist = (display_name) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(1) AS num FROM note_tags where display_name = '${display_name}';`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.getTagsByNid = (nid) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT t.id, t.display_name FROM relation AS r JOIN note_tags AS t ON r.tid = t.id  WHERE r.nid = ${nid};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}
tag.deleteRelation = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM relation WHERE tid = ${id};`;
    pool.query(sql, (err, results) => {
      if(err) return reject(err)
      return resolve(results)
    })
  })
}

module.exports = tag;
