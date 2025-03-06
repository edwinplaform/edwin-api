# EDWin E-tuition Platform - Backend

## Overview

The EDWin E-tuition Platform backend is built using Node.js and Express.js, providing a robust API for the EDWin online tutoring platform. This backend handles user authentication, session management, and interactions between students and tutors. It is designed to support a scalable and efficient educational experience.

## Features

- **User Authentication**: Secure registration and login for students and tutors using JWT (JSON Web Tokens).
- **CRUD Operations**: Full support for creating, reading, updating, and deleting resources such as users, subjects, sessions, and feedback.
- **Real-Time Communication**: Integration with WebRTC or Socket.IO for live tutoring sessions.
- **Role Management**: Students, tutors, and admins have different access levels.
- **Database Integration**: Uses MySQL for persistent data storage.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **MySQL**: Relational database for data storage.
- **JWT**: For secure user authentication.
- **Socket.IO**: For real-time communication (if applicable).

## Installation

To run the backend locally, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/ksulakshana02/edwin-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd edwin-e-tuition-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a .env file in the root directory and add your database configuration:
   ```bash
   HOST=localhost
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DATABASE=your_database_name
   DB_PORT=5432
   ```
5. Start the server:
   ```bash
   nodemon server.js
   ```
6. The server will run at `http://localhost:3000`.

## API Endpoints

## User Endpoints
- **POST /api/users/register** : Register a new user.
- **POST /api/users/login** : Login an existing user.
- **GET /api/users** : Get all users (admin only).

## Subject Endpoints
- **POST /api/sessions** : Schedule a new tutoring session.
- **GET /api/sessions** : Get all sessions for a user.

## Message Endpoints
- **POST /api/messages** : Send a message between users.
- **GET /api/messages** : Get messages for a user.















