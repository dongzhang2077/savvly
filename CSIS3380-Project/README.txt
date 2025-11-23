=============================================================
  Savvly - Personal Budget Management Application
  CSIS 3380 Final Project
  MERN Stack Application
=============================================================

PROJECT OVERVIEW
--------------
Savvly is a full-stack personal finance management application that helps users track budgets, manage transactions, and make informed financial decisions. The application demonstrates integration of MongoDB, Express.js, React, and Node.js (MERN stack).

FOLDER STRUCTURE
--------------
CSIS3380-Project/
├── client/                 # React Front-End (CRA)
│   ├── src/
│   │   ├── pages/         # All page components
│   │   ├── services/      # API client services
│   │   ├── App.jsx        # Main app with routing
│   │   └── index.css      # Global styles with Savvly palette
│   └── package.json
├── server/                 # Express/Node Back-End
│   ├── routes/            # API route handlers
│   │   ├── auth.js       # Authentication routes
│   │   ├── budgets.js    # Budget CRUD routes
│   │   └── transactions.js # Transaction CRUD routes
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   ├── Budget.js
│   │   └── Transaction.js
│   ├── config/            # Database configuration
│   ├── middleware/        # Auth middleware
│   ├── server.js          # Main server file (Port 5000)
│   └── package.json
└── data/                   # JSON seed data
    ├── budgets.json       # 25+ budget documents
    └── transactions.json  # 15+ transaction documents

TECHNOLOGY STACK
--------------
Front-End:
- React 19.2.0 (Create React App)
- React Router 6.28.0 for routing
- Axios 1.13.2 for HTTP requests (as required by course)
- React Hook Form 7.66.0 for form management
- Zod 4.1.12 for validation

Back-End:
- Node.js with Express 5.1.0
- MongoDB with Mongoose 8.19.4
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

Database:
- MongoDB Atlas (Cloud)
- Database Name: savvlyDB
- Collections:
  * users (Authentication)
  * budgets (25+ documents with categories, amounts, rollover types)
  * transactions (15+ documents with income/expense tracking)

FEATURES IMPLEMENTED
------------------
1. User Authentication & Authorization
   - Register new users with validation
   - Login with JWT tokens (7-day expiry)
   - Password hashing with bcryptjs (10 rounds)
   - Global authentication state (React Context API)
   - Protected API routes with authentication middleware
   - User data isolation (each user only sees their own data)

2. Budget Management (Full CRUD)
   - Create budgets with categories, amounts, rollover types
   - View all budgets with month/year filtering
   - Update budget details (Bootstrap-styled form)
   - Delete budgets
   - Track spending vs budget allocation
   - User-specific budget filtering

3. Transaction Management (Full CRUD)
   - Add income/expense transactions
   - View transaction history
   - Delete transactions with automatic dashboard updates
   - Filter by category and date
   - Real-time statistics updates after deletion
   - User-specific transaction filtering

4. Dashboard
   - Overview of current month's budgets
   - Budget health indicators
   - Recent transaction list
   - Visual progress bars
   - Net flow calculations (income - expenses)
   - Overspent category alerts
   - Real-time data updates

5. External API Integration
   - Exchange rate data from Open Exchange Rates API
   - Display spotlight currencies (CAD, EUR, GBP, JPY, AUD)
   - Base currency conversion
   - Real-time rate updates

6. Navigation
   - React Router with 8 routes (/, /budgets, /budgets/new, /budgets/edit/:id, /transactions, /exchange-rates, /login, /register)
   - Responsive navbar with brand logo
   - Dynamic user menu (shows username when logged in)
   - Logout functionality with session cleanup
   - Bootstrap 5 styling throughout

7. Data Persistence
   - MongoDB Atlas cloud database
   - User sessions persisted in localStorage
   - Automatic session restoration on page reload
   - JWT token management with Axios interceptors

PREREQUISITES
-----------
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- MongoDB Atlas account (connection string configured in .env)
- Modern web browser (Chrome, Firefox, Safari, Edge)

INSTALLATION & SETUP
------------------
1. Install Server Dependencies:
   cd CSIS3380-Project/server
   npm install

2. Install Client Dependencies:
   cd CSIS3380-Project/client
   npm install

3. Environment Configuration:
   Server .env file is already configured with:
   - MongoDB Atlas connection string
   - JWT secret key
   - Port 5000

HOW TO RUN THE PROJECT
--------------------
IMPORTANT: You need TWO separate terminal windows/tabs

Terminal 1 - Start Backend Server:
   cd CSIS3380-Project/server
   npm run dev
   
   Expected Output:
   ✅ Server listening on http://localhost:5000
   ✅ MongoDB connected

Terminal 2 - Start React Client:
   cd CSIS3380-Project/client
   npm start
   
   Expected Output:
   Compiled successfully!
   Opens browser at http://localhost:3000

TESTING THE APPLICATION
---------------------
1. Open http://localhost:3000 in your browser

2. User Authentication Flow:
   - Click "Sign Up" → Register a new account
   - Or use test account: user_9684@savvly.com / password123
   - After login, see your username in top-right corner
   - Click "Logout" to end session

3. Navigate through all pages using the navbar:
   - Dashboard (/)
   - Budgets (/budgets)
   - Transactions (/transactions)
   - Exchange Rates (/exchange-rates)

4. Test CRUD Operations:
   Budget Operations:
   - Click "Budgets" → View your budgets (empty for new users)
   - Click "+ Create Budget" → Add new budget (Bootstrap form with validation)
   - Click "Edit" on any budget → Update budget details
   - Click "Delete" on any budget → Remove budget

   Transaction Operations:
   - Click "Transactions" → View your transaction history
   - Fill form and click "Add Transaction" → Create new transaction
   - Toggle "Income/Expense" switch
   - Click "Delete" to remove transaction (dashboard auto-updates)
   - Change "Show" dropdown to view 10/25/50/100 transactions

   External API:
   - Click "Exchange Rates" → View live currency rates
   - Change base currency (e.g., CAD, EUR)
   - Click "Refresh" to fetch latest rates
   - View spotlight currencies and full rate table

5. Test User Data Isolation:
   - Register multiple accounts
   - Create budgets/transactions in each account
   - Verify each user only sees their own data
   - Run test script: ./test-user-flow.ps1

API ENDPOINTS (Backend Routes)
----------------------------
Authentication:
POST /api/auth/register  - Register new user (returns JWT token)
POST /api/auth/login     - Login user (returns JWT token)

Budgets (Protected - Requires Authentication):
GET    /api/budgets      - Get user's budgets (supports ?month=11&year=2025)
GET    /api/budgets/:id  - Get single budget (user-owned only)
POST   /api/budgets      - Create new budget (auto-assigns userId)
PUT    /api/budgets/:id  - Update budget (user-owned only)
DELETE /api/budgets/:id  - Delete budget (user-owned only)

Transactions (Protected - Requires Authentication):
GET    /api/transactions - Get user's transactions (?limit=50)
POST   /api/transactions - Create transaction (auto-assigns userId)
DELETE /api/transactions/:id - Delete transaction (user-owned only)

Authentication Method:
- JWT Bearer tokens sent in Authorization header
- Axios interceptors automatically attach tokens
- Tokens stored in localStorage with 7-day expiry

DEPENDENCIES LIST
---------------
Server Dependencies:
- express: ^5.1.0
- mongoose: ^8.19.4
- cors: ^2.8.5
- dotenv: ^17.2.3
- bcryptjs: ^3.0.3
- jsonwebtoken: ^9.0.2
- nodemon: ^3.1.11 (dev)

Client Dependencies:
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^6.28.0
- axios: ^1.13.2 (HTTP client for API requests, replaces fetch)
- react-hook-form: ^7.66.0
- @hookform/resolvers: ^5.2.2
- zod: ^4.1.12
- react-scripts: ^5.0.1
- bootstrap: ^5.3.0 (UI framework)

DATABASE SCHEMA
-------------
User Schema (users collection):
{
  email: String (required, unique, indexed),
  password: String (required, hashed with bcrypt),
  name: String (required),
  timestamps: true
}

Budget Schema (budgets collection):
{
  userId: String (required, indexed),
  category: String (required),
  amount: Number (required, min: 0),
  spent: Number (default: 0),
  month: Number (1-12, required),
  year: Number (min: 2000, required),
  rolloverType: String (enum: ['full', 'partial', 'none', 'goal']),
  notes: String,
  timestamps: true
}

Transaction Schema (transactions collection):
{
  userId: String (required, indexed),
  description: String (required, max: 120 chars),
  category: String (required),
  amount: Number (required),
  isIncome: Boolean (default: false),
  date: Date (default: now),
  notes: String,
  timestamps: true
}

DESIGN NOTES
----------
- Color Palette: Savvly uses calm blue/green tones for financial wellness
- Responsive Design: Bootstrap 5 grid system for mobile, tablet, and desktop
- User-Friendly: Soft language, no harsh warnings
- Accessibility: ARIA labels, keyboard navigation
- Modern UI: Card-based layouts, shadow effects, hover states
- Form Validation: Real-time validation with React Hook Form + Zod
- Loading States: Spinners for async operations
- Empty States: Friendly messages with icons when no data exists

KNOWN LIMITATIONS
---------------
- MongoDB deprecation warnings (useNewUrlParser, useUnifiedTopology) are harmless
- Exchange rate API has rate limits on free tier
- Old data in database (before user isolation) won't have userId field
- Password reset functionality not yet implemented

TROUBLESHOOTING
-------------
Port 3000 already in use:
  - Kill existing process: Stop-Process -Id <PID>
  - Or run on different port when prompted

Server won't connect to MongoDB:
  - Check internet connection
  - Verify .env file exists in server folder
  - Confirm MONGODB_URI is valid

API requests failing:
  - Ensure server is running on port 5000
  - Check console for CORS errors
  - Verify API_BASE_URL in client matches server

BUILD FOR PRODUCTION
------------------
Client Build:
  cd CSIS3380-Project/client
  npm run build
  
  Creates optimized production build in client/build/

Server Production:
  cd CSIS3380-Project/server
  npm start
  
  Runs server without nodemon hot-reload

RUBRIC COMPLIANCE CHECKLIST
--------------------------
✅ Front-End (React)
  ✅ React components created
  ✅ Conditional rendering (empty states, loading)
  ✅ Event handling (forms, buttons)
  ✅ State management (React hooks)
  ✅ React Router routing (6+ routes)
  ✅ Navigation menu (navbar with 6 links)
  ✅ Styling (custom CSS with Savvly palette)
  ✅ CRUD operations (budgets, transactions)
  ✅ External API (Exchange Rates)
  ✅ Front-end tested standalone with mock data

✅ MongoDB Database
  ✅ Database name: savvlyDB
  ✅ Collections: budgets (6+ fields), transactions (5+ fields), users
  ✅ 25+ documents in budgets collection
  ✅ 15+ documents in transactions collection
  ✅ JSON seed data files included

✅ Back-End (Node/Express)
  ✅ Express server on port 5000
  ✅ All dependencies in package.json
  ✅ nodemon installed
  ✅ MongoDB connection working
  ✅ Routes folder with CRUD handlers
  ✅ Models folder with Mongoose schemas
  ✅ GET routes tested in browser
  ✅ All routes work (tested with Thunder Client)

✅ Front-End to Back-End Integration
  ✅ API client service layer (services/api.js)
  ✅ Axios interceptors for authentication (auto token injection)
  ✅ Axios middleware for API communication (as required)
  ✅ Routes match backend endpoints
  ✅ Full integration tested
  ✅ User authentication with JWT tokens
  ✅ Protected routes with authorization
  ✅ Session persistence with localStorage
  ✅ Real-time dashboard updates
  ✅ User data isolation enforced

✅ Additional Features
  ✅ React Context API for global auth state
  ✅ Custom event system for cross-component updates
  ✅ Bootstrap 5 UI framework
  ✅ Form validation with Zod schemas
  ✅ Automated testing script (test-user-flow.ps1)
  ✅ Comprehensive setup documentation (SETUP_GUIDE.md)
  ✅ Environment configuration template (.env.example)

PROJECT STATUS: ✅ COMPLETE & READY FOR SUBMISSION

Last Updated: November 22, 2025
