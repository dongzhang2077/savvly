# Savvly Project Setup Guide

## Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

## Quick Start

### 1. Clone the Project
```bash
git clone <your-repo-url>
cd CSIS3380-Project
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Configure Environment Variables

In the `server` directory, copy `.env.example` to `.env`:

```bash
cd server
cp .env.example .env
```

The `.env` file already contains all required configurations (MongoDB connection, JWT secret, etc.) and requires no modifications.

### 4. Start Services

**Backend Server (Port 5000):**
```bash
cd server
npm run dev
```

**Frontend Application (Port 3000):**
```bash
cd client
npm start
```

### 5. Access the Application

Open your browser and visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 6. Test Account

Use the following test account to login:
- Email: `user_9684@savvly.com`
- Password: `password123`

Or register a new account.

## Features

✅ User Registration and Login (JWT Authentication)  
✅ Budget Management (Create, Edit, Delete)  
✅ Transaction Records (Income/Expense Tracking)  
✅ Dashboard Statistics (Budget Progress, Net Flow)  
✅ Exchange Rates Query (Integrated with Open Exchange Rates API)  
✅ User Data Isolation (Each user can only see their own data)

## Tech Stack

**Frontend:**
- React 19.2.0
- React Router 6.28.0
- React Hook Form + Zod
- Bootstrap 5
- Axios 1.13.2

**Backend:**
- Node.js + Express 5.1.0
- MongoDB Atlas (Cloud Database)
- JWT Authentication
- bcrypt Password Encryption

## Project Structure

```
CSIS3380-Project/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Page Components
│   │   ├── services/      # API Calls
│   │   ├── contexts/      # React Context
│   │   └── App.jsx
│   └── package.json
├── server/                # Node.js Backend
│   ├── models/           # MongoDB Models
│   ├── routes/           # API Routes
│   ├── middleware/       # Authentication Middleware
│   └── server.js
└── data/                 # Initial Data (Optional)
```

## Troubleshooting

**Q: Frontend cannot connect to backend?**  
A: Make sure the backend server is running on port 5000, and check the baseURL in `client/src/services/api.js`.

**Q: Database connection failed?**  
A: Check if the `MONGODB_URI` in the `.env` file is correct.

**Q: Can't see any data after login?**  
A: This is normal! Each user can only see their own created data (user data isolation feature).

## Testing

Run backend API tests:
```bash
cd CSIS3380-Project
./test-user-flow.ps1
```

## Contact

If you have any questions, please contact the project leader.
