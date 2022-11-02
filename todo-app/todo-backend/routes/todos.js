const { response } = require('express');
const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  console.log("testi2")
  if(req.todo){
    return res.json(req.todo)
  } else {
    return res.sendStatus(404).end;
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {

  console.log("testi2")
  console.log(req.body)
  const todo = {
    text: req.body.text,
    done: req.body.done
  }

  updatedTodo = await Todo.findOneAndUpdate(req.todo.id, todo, { new: true })
  
  if (updatedTodo) {
    return res.json(updatedTodo)
  } else {
    return res.sendStatus(404).end;
  }

  //res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
