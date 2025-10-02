# Todo List REST API

A simple and elegant REST API for managing todo items, built with Express.js.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 🚀 RESTful API design
- 🔄 CORS enabled
- 📝 Request logging with Morgan
- ⚠️ Error handling middleware
- 🎨 Clean and organized code structure

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd todo-list-api
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`
```
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get a specific todo by ID |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## API Examples

### Get all todos
```bash
curl http://localhost:3000/api/todos
```

### Get a single todo
```bash
curl http://localhost:3000/api/todos/1
```

### Create a new todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial"
  }'
```

### Update a todo
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "completed": true
  }'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Request/Response Format

### Create/Update Todo Request Body
```json
{
  "title": "Todo title (required for creation)",
  "description": "Todo description (optional)",
  "completed": false
}
```

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Learn Express.js",
    "description": "Build a REST API with Express.js",
    "completed": false,
    "createdAt": "2025-10-01T12:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Project Structure

```
todo-list-api/
├── src/
│   ├── controllers/
│   │   └── todoController.js    # Business logic for todos
│   ├── routes/
│   │   └── todoRoutes.js         # API routes
│   ├── middleware/
│   │   └── errorMiddleware.js    # Error handling
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## Technologies Used

- **Express.js** - Fast, unopinionated web framework for Node.js
- **CORS** - Enable Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger middleware
- **dotenv** - Environment variable management
- **Nodemon** - Auto-restart server during development

## Future Enhancements

- [ ] Add database integration (MongoDB, PostgreSQL)
- [ ] Implement authentication & authorization
- [ ] Add input validation
- [ ] Write unit and integration tests
- [ ] Add API documentation with Swagger
- [ ] Implement pagination for large datasets
- [ ] Add filtering and sorting capabilities

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

