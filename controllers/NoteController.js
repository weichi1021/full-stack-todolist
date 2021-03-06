const NoteModel = require('../models/NoteModel')
const TagController = require('./TagController')

class NoteController {
  async create(payload) {
    let { title, content, tags } = payload
    let results = await NoteModel.create(title, content);
    results = JSON.parse( JSON.stringify(results) )
    tags.forEach(async (item) => {
      const isExist = await TagController.isExist(item.display_name)
      if(isExist){
        item = await TagController.find(item.display_name)
      }else{
        item = await TagController.create(item.display_name)
      }
      await NoteModel.bindTag(results.insertId, item.id)
    })
    return { id: results.insertId }
  }
  async read(payload) {
    let { active } = payload
    let results = await NoteModel.read(active);
    results = JSON.parse(JSON.stringify(results))
    return await Promise.all(results.map(async (item) => {
      const tags = await (item.tags)? item.tags.split(' ,').map(item => JSON.parse(item)): [];
      return { ...item, tags }
    }))
  }
  async update(payload) {
    let { id, title, content, tags } = payload
    await NoteModel.undoTag(id)
    await NoteModel.update(id, title, content);
    tags.forEach(async (item) => {
      const isExist = await TagController.isExist(item.display_name)
      if(isExist){
        item = await TagController.find(item.display_name)
      }else{
        item = await TagController.create(item.display_name)
      }
      await NoteModel.bindTag(id, item.id)
    })
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
  async getNoteByTid(payload) {
    let results = await NoteModel.getNoteByTid(payload);
    results = JSON.parse(JSON.stringify(results))
    return await Promise.all(results.map(async (item) => {
      const tags = await (item.tags)? item.tags.split(' ,').map(item => JSON.parse(item)): [];
      return { ...item, tags }
    }))
  }
}

module.exports = new NoteController();
