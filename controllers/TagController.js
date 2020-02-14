const TagModel = require('../models/TagModel');

class TagController {
  async create(display_name) {
    let results = await TagModel.create(display_name);
    results = JSON.parse( JSON.stringify(results) )
    return { id: results.insertId }
  }
  async read() {
    let results = await TagModel.read();
    return results
  }
  async update(id, payload) {
    let { display_name } = payload
    await TagModel.update(id, display_name);
    return { id }
  }
  async delete(id) {
    console.log(id)
    await TagModel.delete(id);
    await TagModel.deleteRelation(id)
    return {}
  }
  async find(display_name) {
    let results = await TagModel.find(display_name);
    results = JSON.parse( JSON.stringify(results) )
    return results[0]
  }
  async isExist(display_name) {
    let results = await TagModel.isExist(display_name);
    results = JSON.parse( JSON.stringify(results) )
    return (results[0].num > 0)
  }
  async getTagsByNid(nid) {
    let results = await TagModel.getTagsByNid(nid);
    results = JSON.parse( JSON.stringify(results) )
    return results
  }
}

module.exports = new TagController();
