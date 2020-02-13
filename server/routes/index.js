const express = require('express')
const NoteController = require('../../controllers/NoteController')
const router = express.Router();

router.post('/todo-list',async (req, res, next) => {
  try{
    let results = null;
    console.log(req.body)
    switch(req.body.action) {
      case 'query_todo_list':
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

module.exports = router;
