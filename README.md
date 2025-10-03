# Todo List REST API

A simple and elegant REST API for managing todo items, built with Express.js and Supabase.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 🚀 RESTful API design
- 🔄 CORS enabled
- 📝 Request logging with Morgan
- ⚠️ Error handling middleware
- 🎨 Clean and organized code structure
- 🗄️ Supabase database integration
- 🔐 Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

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
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to your project dashboard and navigate to Settings > API
3. Copy your Project URL and anon/public key
4. Create a `todos` table in your Supabase database with the following structure:

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Update your `.env` file with the Supabase credentials

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
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
curl http://localhost:5000/api/todos
```

### Get a single todo
```bash
curl http://localhost:5000/api/todos/{uuid}
```

### Create a new todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial"
  }'
```

### Update a todo
```bash
curl -X PUT http://localhost:5000/api/todos/{uuid} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "completed": true
  }'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:5000/api/todos/{uuid}
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
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Learn Express.js",
    "description": "Build a REST API with Express.js",
    "completed": false,
    "created_at": "2025-10-01T12:00:00.000Z",
    "updated_at": "2025-10-01T12:00:00.000Z"
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
│   ├── config/
│   │   └── supabase.js           # Supabase configuration
│   ├── controllers/
│   │   └── todoController.js     # Business logic for todos
│   ├── services/
│   │   └── databaseService.js    # Database operations
│   ├── routes/
│   │   └── todoRoutes.js         # API routes
│   ├── middleware/
│   │   └── errorMiddleware.js    # Error handling
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## Technologies Used

- **Express.js** - Fast, unopinionated web framework for Node.js
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **CORS** - Enable Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger middleware
- **dotenv** - Environment variable management
- **Nodemon** - Auto-restart server during development

## Future Enhancements

- [x] Add database integration (Supabase/PostgreSQL)
- [ ] Implement authentication & authorization
- [ ] Add input validation
- [ ] Write unit and integration tests
- [ ] Add API documentation with Swagger
- [ ] Implement pagination for large datasets
- [ ] Add filtering and sorting capabilities
- [ ] Add real-time subscriptions with Supabase

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

