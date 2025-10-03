const DatabaseService = require('../services/databaseService');

// Initialize database service
const dbService = new DatabaseService('tasks');

// Helper function to map database fields to API response format
const mapTaskToTodo = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description || '',
    completed: task.status || false,
    createdAt: task.created_at,
    updatedAt: task.updated_at
  };
};

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res) => {
  try {
    const { data, error } = await dbService.getAll();
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch todos',
        details: error.message
      });
    }

    res.json({
      success: true,
      count: data.length,
      data: data.map(mapTaskToTodo)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await dbService.getById(id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch todo',
        details: error.message
      });
    }

    res.json({
      success: true,
      data: mapTaskToTodo(data)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a title'
      });
    }

    const newTodo = {
      title,
      description: description || '',
      status: false
    };

    const { data, error } = await dbService.create(newTodo);

    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create todo',
        details: error.message
      });
    }

    res.status(201).json({
      success: true,
      data: mapTaskToTodo(data)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Build update object with only provided fields
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.status = completed;

    const { data, error } = await dbService.update(id, updates);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Failed to update todo',
        details: error.message
      });
    }

    res.json({
      success: true,
      data: mapTaskToTodo(data)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await dbService.delete(id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Failed to delete todo',
        details: error.message
      });
    }

    res.json({
      success: true,
      data: mapTaskToTodo(data)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};

