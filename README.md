# Blog API (Node.js + Express + Prisma)

A simple and clean blog backend built with **Node.js**, **Express**, **Prisma**, **JWT authentication**, and **SQLite**.  
This API supports:

- Public blog posts
- Admin-only post creation, editing, publishing, and deletion
- Public comments
- Admin-only comment deletion
- User authentication (Register + Login)

---

##  Features

### Public
- View all published posts
- View a single post
- View comments for a post
- Add comments

### Admin (requires JWT token)
- Create posts
- Edit posts
- Publish/unpublish posts
- Delete posts
- Delete comments
- View all posts (including unpublished)

---

## Tech Stack

- **Node.js**
- **Express**
- **Prisma ORM**
- **SQLite (default)**
- **JWT Authentication**
- **bcrypt for password hashing**
- **CORS enabled**

---

##  Installation

### 1. Clone the project : git clone https://github.com/Anucs1304/Blog-API.git

### 2. Install dependencies

### 3. Set up environment variables  
Create a `.env` file:

### 4. Run Prisma migrations : npx prisma migrate dev --name init

### 5. Start the server : npx nodemon src/app.js

Server runs at: http://localhost:3000
---

##  Authentication

This API uses **JWT tokens**.

### Register : POST/auth/register
 
Body:
{
  "username": "Julia",
  "email": "Julia@example.com",
  "password": "123456",
  "role": "ADMIN"
}

### Login : POST /auth/login
Body:
{
  "username": "Julia",
  "password": "123456"
}

### Response
{
  "token": "your_jwt_token_here"
}

### Use this token in admin routes 
Authorization : Bearer <token>

### Create a Post 
POST /posts
Body: {
  "title": "My First Blog Post",
  "content": "Hello world!",
  "published": false
}

### Edit a Post
PUT /posts/:id

### Publish/unpublish a post
PATCH /posts/:id/publish

### Delete a post
DELETE /posts/:id


