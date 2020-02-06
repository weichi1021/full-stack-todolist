const express = require('express')
const db = require('../db')
const router = express.Router();

router.post('/todo-list',async (req, res, next) => {
  try{
    // console.log(req.body.action)
    switch(req.body.action) {
      case 'query_todo_list':
        let results = await db.all();
        res.json(results)
        break;
      case 'add_note':
        let { title, content } = req.body.data
        await db.add(title, content);
        res.json({})
        break;
      case 'delete_note':
        let { id } = req.body.data
        await db.delete(id);
        res.json({})
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
