const NoteModel = require('../model/NoteModel')

class NoteController {
  async create(payload) {
    let { title, content } = payload
    let results = await NoteModel.create(title, content);
    results = JSON.parse( JSON.stringify(results) )
    return { id: results.insertId }
  }
  async read(payload) {
    let results = await NoteModel.read(payload);
    return results
  }
  async update(payload) {
    let { id, title, content } = payload
    await NoteModel.update(id, title, content);
    return { id }
  }
  async delete(payload) {
    let { id } = payload
    await NoteModel.delete(id);
    return {}
  }
  async changeActive(payload) {
    let { id, active } = payload
    await NoteModel.changeActive(id, active);
    return { id }
  }
}

module.exports = new NoteController();
