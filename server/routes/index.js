const express = require('express')
const NoteController = require('../../controllers/NoteController')
const TagController = require('../../controllers/TagController')
const router = express.Router();

router.post('/note-list', async (req, res, next) => {
  console.log(req.body)
  try{
    let results = null;
    switch(req.body.action) {
      case 'query_note_list':
        results = await NoteController.read(req.body.data);
        res.json(results)
        break;

      case 'add_note':
        results = await NoteController.create(req.body.data)
        res.json(results)
        break;

      case 'save_note':
        results = await NoteController.update(req.body.data);
        res.json(results)
        break;

      case 'delete_note':
        results = await NoteController.delete(req.body.data);
        res.json(results)
        break;

      case 'change_active_note':
        results = await NoteController.changeActive(req.body.data);
        res.json(results)
        break;

      default:
        break;
    }
  }catch(err){
    console.log('err 500')
    res.sendStatus(500)
  }
})

router.get('/tags', async (req, res, next) => {
  try{
    let results = await TagController.read();
    res.json(results)
  }catch{
    console.log('err 500')
    res.sendStatus(500)
  }
})
router.post('/tags', async (req, res, next) => {
  try{
    console.log(req.body.action)
    switch (req.body.action) {
      case 'create_tag':
        let results = await TagController.create(req.body.data.display_name);
        res.json(results)
        break;

      default:
        break;
    }
  }catch{
    console.log('err 500')
    res.sendStatus(500)
  }
})
router.post('/tags/:id', async (req, res, next) => {
  try{
    let results = await NoteController.getNoteByTid(req.params.id);
    res.json(results)
  }catch{
    console.log('err 500')
    res.sendStatus(500)
  }
})
router.put('/tags/:id', async (req, res, next) => {
  try{
    console.log(req.body.action)
    switch (req.body.action) {
      case 'update_tag':
        let results = await TagController.update(req.params.id, req.body.data);
        res.json(results)
        break;

      default:
        break;
    }
  }catch{
    console.log('err 500')
    res.sendStatus(500)
  }
})
router.delete('/tags/:id', async (req, res, next) => {
  try{
    let results = await TagController.delete(req.params.id);
    res.json(results)
  }catch{
    console.log('err 500')
    res.sendStatus(500)
  }
})

module.exports = router;
