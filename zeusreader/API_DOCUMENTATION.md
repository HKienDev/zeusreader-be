# API Documentation

## Authentication

```http
POST /api/v1/auth/login
POST /api/v1/auth/register
```

## Users

```http
GET /api/v1/users/profile
PUT /api/v1/users/profile
GET /api/v1/users
GET /api/v1/users/:id
PUT /api/v1/users/:id
DELETE /api/v1/users/:id
```

## Admin

```http
GET /api/v1/admin/dashboard
GET /api/v1/admin/stats/users
GET /api/v1/admin/stats/books
```

## Books

```http
GET /api/v1/books
GET /api/v1/books/:id
GET /api/v1/books/search
GET /api/v1/books/category/:category
POST /api/v1/books
PUT /api/v1/books/:id
DELETE /api/v1/books/:id
```

## Library

```http
POST /api/v1/library/:bookId
GET /api/v1/library
GET /api/v1/library/favorites
GET /api/v1/library/reading
PUT /api/v1/library/:bookId/favorite
PUT /api/v1/library/:bookId/reading
PUT /api/v1/library/:bookId/progress
DELETE /api/v1/library/:bookId
```

## Bookmarks

```http
POST /api/v1/bookmarks
GET /api/v1/bookmarks
GET /api/v1/bookmarks/:id
PUT /api/v1/bookmarks/:id
DELETE /api/v1/bookmarks/:id
DELETE /api/v1/bookmarks/book/:bookId
```

## Reading Progress

```http
POST /api/v1/reading/start/:bookId
PUT /api/v1/reading/progress/:bookId
GET /api/v1/reading/progress/:bookId
GET /api/v1/reading/history
PUT /api/v1/reading/complete/:bookId
GET /api/v1/reading/stats
DELETE /api/v1/reading/progress/:bookId
```

## Notes

- All endpoints are prefixed with `/api/v1`.
- Use `Authorization: Bearer <token>` for protected routes.
- Admin routes require `role: admin`.
- All request/response bodies are in JSON format.

## Overview

Zeus Reader is a book reading management application with a modular NestJS backend architecture.

## Base URL

```text
http://localhost:3000/api/v1
```

## User Management Endpoints

### Get All Users

```http
GET /users
```

### Get User by ID

```http
GET /users/:id
```

### Create User

```http
POST /users
```

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Update User

```http
PUT /users/:id
```

### Delete User

```http
DELETE /users/:id
```

## Book Management Endpoints

### Get All Books

```http
GET /books
GET /books?search=harry potter
```

### Get Book by ID

```http
GET /books/:id
```

### Create Book

```http
POST /books
```

**Request Body:**

```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J.K. Rowling",
  "description": "The first book in the Harry Potter series",
  "isbn": "9780747532699",
  "rating": 4.5,
  "coverImage": "https://example.com/cover.jpg",
  "genre": "Fantasy"
}
```

### Update Book

```http
PUT /books/:id
```

### Delete Book

```http
DELETE /books/:id
```

## Reading Progress Endpoints

### Get All Reading Progress

```http
GET /reading-progress
GET /reading-progress?userId=123
```

### Get Reading Progress by ID

```http
GET /reading-progress/:id
```

### Create Reading Progress

```http
POST /reading-progress
```

**Request Body:**

```json
{
  "userId": "123",
  "bookId": "456",
  "currentPage": 50,
  "progressPercentage": 25,
  "status": "reading",
  "notes": "Great book so far!"
}
```

### Update Reading Progress

```http
PUT /reading-progress/:id
```

### Delete Reading Progress

```http
DELETE /reading-progress/:id
```

## Response Format

All API responses follow this format:

```json
{
  "data": {},
  "message": "Success",
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Running the Application

1. Install dependencies:

```bash
npm install
```

1. Start development server:

```bash
npm run start:dev
```

1. The API will be available at `http://localhost:3000/api/v1`

## Project Structure

```text
src/
├── modules/
│   ├── auth/           # Authentication module
│   ├── users/          # User management module
│   ├── books/          # Book management module
│   ├── reading-progress/ # Reading progress module
│   └── common/         # Common utilities
├── config/             # Configuration files
├── guards/             # Authentication guards
├── interceptors/       # Response interceptors
└── decorators/         # Custom decorators
```
