const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Todo List API',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

app.use('/api/todos', todoRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;

