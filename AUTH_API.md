# Authentication API Documentation

This document describes the authentication endpoints and how to use them with the Todo List API.

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe" // optional
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email for verification.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "email_confirmed": false
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

### 2. Login User
**POST** `/api/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "email_confirmed": true
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_at": 1234567890
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 3. Get User Profile
**GET** `/api/auth/me`

Get current user profile information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "email_confirmed": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 4. Logout User
**POST** `/api/auth/logout`

Logout the current user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 5. Refresh Access Token
**POST** `/api/auth/refresh`

Refresh the access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "session": {
    "access_token": "new_jwt_token",
    "refresh_token": "new_refresh_token",
    "expires_at": 1234567890
  }
}
```

## Using Authentication with Todo Routes

All todo routes now require authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Example: Creating a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "title": "My Todo",
    "description": "Todo description",
    "completed": false
  }'
```

### Example: Getting All Todos
```bash
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer <access_token>"
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error during authentication"
}
```

## Environment Variables

Make sure you have the following environment variables set in your `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing the Authentication

### 1. Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### 2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Use the access token from login response to access protected routes:
```bash
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## Security Features

- JWT token validation using Supabase Auth
- Password strength validation (minimum 6 characters)
- Email format validation
- Token expiration handling
- Secure token refresh mechanism
- Email confirmation support
- Protected route middleware

## Middleware Options

The authentication middleware provides three options:

1. **`authenticateToken`** - Requires valid token, fails if no token or invalid token
2. **`optionalAuth`** - Doesn't fail if no token, but adds user info if valid token provided
3. **`requireEmailConfirmation`** - Requires user to have confirmed email address

Use these middleware functions in your routes as needed:

```javascript
const { authenticateToken, optionalAuth, requireEmailConfirmation } = require('../middleware/authMiddleware');

// Require authentication
router.get('/protected', authenticateToken, handler);

// Optional authentication
router.get('/public', optionalAuth, handler);

// Require email confirmation
router.get('/verified-only', authenticateToken, requireEmailConfirmation, handler);
```
