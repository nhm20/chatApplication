# Application Architecture & Flow

## Overview

This chat application comprises two main parts:

1. **Backend (Node.js + Express + MongoDB)**
2. **Frontend (React + Vite)**

Users can login with any credentials (for demo purposes) and chat with a list of mock users. Data persistence is handled by MongoDB.

---

## 1. Backend

### Structure
```
backend/
├── config/
│   └── db.js            # MongoDB connection setup
├── controllers/
│   └── authController.js  # Login & logout logic
├── models/
│   └── User.js            # User schema
├── routes/
│   └── authRoutes.js      # /login, /logout endpoints
└── server.js            # Express server startup + middleware
```

### Flow

1. **Client Login**
   - Client sends POST `/auth/login` with `{ username }`.
   - Server finds or creates user in MongoDB.
   - JWT issued and returned along with user details.
2. **Client Chat**
   - Frontend uses mock service to fetch users and messages.
   - Messages not persisted in DB for this demo.
3. **Client Logout**
   - Client sends POST `/auth/logout`.
   - Server updates user `online=false`, `lastSeen=Date.now()`.

### Deployment Notes

- Use Amazon Elastic Load Balancer (ELB) to distribute traffic across multiple backend instances.
- Store sessions/tokens in a secure store (e.g., Redis) behind ELB for scalability.
- Configure MongoDB Atlas or AWS DocumentDB for managed database.

---

## 2. Frontend

### Structure
```
frontend/
├── src/
│   ├── components/      # UI components (ChatList, ChatContainer, Navbar, etc.)
│   ├── context/         # AuthContext for managing login state
│   ├── hooks/           # useChat hook for chat data logic
│   ├── pages/           # HomePage, LoginPage, ChatPage
│   ├── services/        # authService (login), chatService (mock data)
│   └── App.jsx          # Main entry with Routes
└── index.css            # Global CSS and Tailwind base
```

### Flow

1. User visits `/login` and provides any username/password.
2. AuthContext creates a local user record, stores in `localStorage`, and updates `user` state.
3. After login, user is redirected to `/chat` (ProtectedRoute).
4. `useChat` hook fetches users/messages from `chatService` (mock) and manages chat state.
5. Messages sent via `sendMessage` are appended locally.

---

## 3. Deployment to AWS

1. **Backend Deployment**
   - Containerize backend with Docker.
   - Deploy containers to ECS behind an Application Load Balancer.
   - Use target groups for blue/green deployments.
2. **Frontend Deployment**
   - Build React app (`npm run build`).
   - Host static files on S3 + CloudFront.
3. **Database**
   - Use MongoDB Atlas or AWS DocumentDB.

### Load Balancer & Scalability

- **AWS ELB/ALB** routes traffic to multiple Docker/ECS backend instances.
- **Auto Scaling Groups** ensure minimum healthy instances.
- **Session Management**: Use JWT with short TTL or store sessions in Redis.
- **Monitoring**: AWS CloudWatch for logs, metrics, and alarms.

---

## Key Considerations

- **Security**: Enable HTTPS, use secure JWT storage in frontend (HttpOnly cookies).
- **Performance**: Enable caching on API responses, CloudFront CDN.
- **Resilience**: Multi-AZ deployment, automated backups.

---

For any questions, reach out to the development team.
