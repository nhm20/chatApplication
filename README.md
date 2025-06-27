# Chat Application

A real-time chat application with a React frontend and a Node.js/Express backend. Users can login with any username/password and chat with mock users.

## Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB (for backend storage)

## Setup and Running Locally

### Backend

1. Open a terminal and navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Create a `.env` file based on `.env.example` (if provided) and set your environment variables:
   ```properties
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the backend server:
   ```powershell
   npm start
   ```
   - The server listens on port 5000 by default.

### Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
   - The app will be available at `http://localhost:5174` by default.

## Usage

1. Open your browser and go to `http://localhost:5174`.
2. Enter any username and password to login.
3. You will be redirected to the chat page where you can select a user and send messages.

## Project Structure

```
chatApplication/
├── backend/    # Express server, MongoDB models, controllers, routes
└── frontend/   # React app with Vite, components, context, hooks
```

## Environment Variables

- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for signing JWT tokens (used in optional auth)

---

For detailed architecture and deployment recommendations, see [ARCHITECTURE.md].
