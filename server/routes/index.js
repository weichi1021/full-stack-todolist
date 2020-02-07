const express = require('express')
const db = require('../db')
const router = express.Router();

router.post('/todo-list',async (req, res, next) => {
  try{
    let results = null;
    let { id, active, title, content } = req.body.data || {}
    console.log(req.body)
    switch(req.body.action) {
      case 'query_todo_list':
        results = await db.list(1);
        res.json(results)
        // res.json([])
        break;
      case 'query_trash_todo_list':
        results = await db.list(0);
        res.json(results)
        break;
      case 'add_note':
        await db.add(title, content);
        res.json({})
        break;
      case 'delete_note':
        await db.delete(id);
        res.json({})
        break;
      case 'change_active_note':
        // console.log(id)
        await db.changeActive(id, active);
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
