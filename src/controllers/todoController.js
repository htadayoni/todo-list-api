// In-memory data store (replace with database in production)
let todos = [
  {
    id: '1',
    title: 'Learn Express.js',
    description: 'Build a REST API with Express.js',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Read documentation',
    description: 'Read Express.js official documentation',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = (req, res) => {
  res.json({
    success: true,
    count: todos.length,
    data: todos
  });
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
const getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  res.json({
    success: true,
    data: todo
  });
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
const createTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a title'
    });
  }

  const newTodo = {
    id: Date.now().toString(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    data: newTodo
  });
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: todos[todoIndex]
  });
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    success: true,
    data: deletedTodo
  });
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};

