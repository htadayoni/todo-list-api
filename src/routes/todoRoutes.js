const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// GET all todos
router.get('/', getTodos);

// GET a single todo by ID
router.get('/:id', getTodoById);

// POST create a new todo
router.post('/', createTodo);

// PUT update a todo
router.put('/:id', updateTodo);

// DELETE a todo
router.delete('/:id', deleteTodo);

module.exports = router;

