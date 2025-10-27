# Savvly App - Architecture Documentation

## Project Overview

Savvly is a Next.js-based budget management application designed specifically for freelancers and contractors with irregular income. It provides smart budget rollover mechanics, tax reservation calculations (tailored for Canadian provinces), and savings runway tracking.

**Current Status**: Early-stage development with foundational architecture and database schema complete. UI components and API routes remain to be implemented.

---

## Technology Stack

### Core Framework
- **Next.js 16.0.0**: Full-stack React framework (App Router)
- **React 19.2.0 & React DOM 19.2.0**: UI library
- **TypeScript 5**: Type safety throughout

### Database & ORM
- **Prisma 6.18.0**: TypeScript ORM for database management
- **PostgreSQL**: Primary database
- **@prisma/client 6.18.0**: Prisma runtime client

### Authentication
- **NextAuth.js 5.0.0-beta.29**: Session and authentication management
- **bcryptjs 3.0.2**: Password hashing

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **@tailwindcss/postcss 4**: New PostCSS-based integration
- **Lucide React 0.548.0**: Icon library
- **shadcn/ui**: Component library (configured, not yet installed)
- **class-variance-authority 0.7.1**: CSS composition utility
- **clsx 2.1.1**: Conditional CSS utility
- **tailwind-merge 3.3.1**: Tailwind class merging

### Utilities & Validation
- **zod 4.1.12**: TypeScript-first schema validation
- **date-fns 4.1.0**: Date manipulation and formatting

---

## Project Structure

### Key Directories

app/               - Next.js App Router with layout, page, and api routes
components/        - React components (ui, dashboard, budget, transaction, layout)
hooks/             - Custom React hooks (empty, to be created)
lib/               - Core business logic and utilities
types/             - TypeScript type definitions
prisma/            - Database schema and migrations
public/            - Static assets
Configuration/     - Various config files (next, tsconfig, postcss, eslint, etc.)

### File Organization

```
app/
├── layout.tsx           Root layout with Geist fonts
├── page.tsx             Home page
├── globals.css          Global styles with design system
└── api/                 [EMPTY] API routes to be created

components/
├── ui/                  [EMPTY] shadcn/ui primitives
├── dashboard/           [EMPTY] Dashboard components
├── budget/              [EMPTY] Budget feature components
├── transaction/         [EMPTY] Transaction components
└── layout/              [EMPTY] Layout wrapper components

lib/
├── prisma.ts           Prisma client singleton
├── utils.ts            Utility functions
├── rollover.ts         Budget rollover calculations
├── runway.ts           Savings runway math
└── tax.ts              Tax reservation calculations

types/
└── index.ts            Core TypeScript types

prisma/
├── schema.prisma       Database schema
└── migrations/         [TO BE CREATED] Database migrations
```

---

## Database Architecture

### Prisma Schema Overview

PostgreSQL database with 5 core models optimized for irregular income budgeting.

#### Model: User
- id: String (CUID primary key)
- email: String (unique)
- name: String (optional)
- passwordHash: String (bcrypt hashed)
- createdAt, updatedAt: DateTime
- Relations: UserSettings (1-1), Budget[] (1-many), Transaction[] (1-many), Goal[] (1-many)

#### Model: UserSettings
- userId: String (FK, unique - one per user)
- budgetMode: String ("accumulation" | "runway")
- taxRate: Float (default 0.28 for Canada)
- autoTaxReserve: Boolean (default true)
- incomePattern: String ("regular" | "irregular", default "irregular")
- averageIncome: Float (optional)
- currentSavings: Float (for runway mode)
- monthlyExpenses: Float (for runway calculations)

#### Model: Budget
- userId, category, month, year (unique together)
- amount: Float (budgeted amount)
- spent: Float (actual spending)
- rolloverType: String ("full" | "partial" | "none" | "goal")
- rolloverPercent: Float (0-100 for partial)
- rolloverAmount: Float (amount carried to next month)
- isTaxReserve: Boolean (special budget flag)
- isFixed: Boolean (fixed vs flexible)
- Relations: Transaction[] (1-many)

#### Model: Transaction
- userId: String (FK)
- budgetId: String (optional FK)
- amount: Float
- description: String
- category: String (optional)
- date: DateTime
- isIncome: Boolean (income vs expense)
- isClassified: Boolean (AI classification flag)

#### Model: Goal
- userId: String (FK)
- name: String
- targetAmount: Float
- currentAmount: Float (default 0)
- isRunwayGoal, isTaxGoal: Boolean (special goal types)
- deadline: DateTime (optional)
- isCompleted: Boolean

### Key Design Decisions

1. CUID primary keys for better distribution
2. Cascading deletes on User deletion
3. Month-year partitioning for rolling calculations
4. Tax reserves modeled as special Budget records
5. Optional budget-transaction relationship for flexibility

---

## Feature Architecture

### 1. Smart Budget Rollover System

Location: `/lib/rollover.ts`

Purpose: Calculate how unspent budget carries to next month

Function: `calculateRollover(budgeted, spent, rolloverType, rolloverPercent)`

Rollover Types:
- **Full**: 100% carries forward (savings accumulation)
- **Partial**: Percentage-based (e.g., 50% carries, 50% expires)
- **None**: Monthly reset (traditional budgeting)
- **Goal**: Accumulates until target amount reached

Returns: { remainingAmount, rolloverAmount, expiredAmount }

Use Case: Freelancers with irregular expenses use different strategies per category
- Housing: full rollover (unused rent accumulates)
- Entertainment: partial 30% rollover (budget somewhat resets)
- Coffee: none (completely resets monthly)

---

### 2. Savings Runway Calculator

Location: `/lib/runway.ts`

Purpose: Calculate how many months of expenses current savings can cover

Function: `calculateRunway(currentSavings, monthlyExpenses)`

Returns: { currentSavings, monthlyExpenses, monthsRemaining, projectedDepletion }

Messaging (empowering, non-anxious):
- 12+ months: "Great position! You have X months of runway."
- 6-12 months: "You have X months of runway - solid cushion."
- 3-6 months: "X months of runway. Consider your next steps."
- 1-3 months: "X months of runway. Time to plan ahead."
- <1 month: "Less than 1 month of runway. Let's review your options."

Why it matters: Contractors experience cash flow anxiety. Knowing exact runway duration
reduces stress and improves decision-making for vacations, health, education, etc.

---

### 3. Tax Reservation System

Location: `/lib/tax.ts`

Purpose: Help Canadian freelancers reserve appropriate tax amounts

Functions:
- calculateTaxReservation(income, taxRate)
- getTaxRateByProvince(province)
- getNetIncome(grossIncome, taxRate)
- getTaxReminderMessage(reserved)

Canada Tax Rates by Province:
- BC: 28% (default, British Columbia)
- QC: 32% (highest, Quebec)
- AB: 25% (lowest, Alberta)
- ON: 29% (Ontario)
- MB: 28%, SK: 27%, NB: 28%, NS: 29%, PE: 28%, NL: 29%, YT: 27%, NT: 26%, NU: 27%

Implementation:
- Default: 28% (BC rates)
- Configurable per user in UserSettings.taxRate
- Modeled as special Budget record with isTaxReserve=true
- Optional auto-reserve on income deposit
- Message tone: "X set aside for taxes - you're covered!" (empowering)



---

## Key Architectural Components Summary

### 1. Database (Prisma + PostgreSQL)
- 5 models: User, UserSettings, Budget, Transaction, Goal
- Designed for irregular income tracking
- Monthly budget partitioning
- Cascading deletes for data integrity

### 2. Business Logic (/lib/)
- rollover.ts: 4 rollover strategies
- runway.ts: Financial runway calculations  
- tax.ts: Canada-specific tax handling
- utils.ts: Helper functions
- prisma.ts: Client singleton

### 3. Authentication (NextAuth.js)
- Configured in environment
- Routes to be implemented
- Session-based with bcryptjs hashing

### 4. Frontend (Components + Pages)
- shadcn/ui components
- Feature-organized structure
- Tailwind CSS with design system
- Dark mode support

### 5. API (To be implemented)
- RESTful endpoints
- Zod validation
- Session-protected routes

---

## Data Model Relationships

User (1) -> (1) UserSettings
User (1) -> (many) Budget
User (1) -> (many) Transaction  
User (1) -> (many) Goal
Budget (1) -> (many) Transaction

Budget properties per category per month:
- Unique constraint: userId + category + month + year
- Tracks rollover amounts between months
- Can mark as tax reserve or fixed

---

## Feature Implementation Status

Complete (In /lib/):
- Budget rollover logic with 4 types
- Savings runway calculations
- Tax reservation (Canada-specific)
- Prisma client singleton setup

Ready (Infrastructure):
- Database schema defined
- Types defined in TypeScript
- Design system in place
- NextAuth configured
- Tailwind CSS configured

To Build (Frontend/API):
- API routes (CRUD endpoints)
- Components (dashboard, forms, lists)
- Pages (dashboard, settings, etc.)
- Authentication flow UI

---

## Quick Facts

Current Version: 0.1.0
Tech Stack: Next.js 16, React 19, TypeScript 5, Prisma 6, NextAuth 5
Database: PostgreSQL
Status: Foundation Complete, Implementation In Progress
Target Users: Freelancers/contractors with irregular income
Geo Focus: Canada (extensible)
Color Palette: Blue, Green, Orange, Coral
Typography: Geist (sans) + Geist Mono

---

## Common Development Tasks

Initialize Database:
  npx prisma migrate dev --name init

View Database:
  npx prisma studio

Create Migration After Schema Change:
  npx prisma migrate dev --name describe_change

Start Development:
  npm run dev

Build for Production:
  npm run build

Check TypeScript:
  npx tsc --noEmit

Lint Code:
  npm run lint

---

## Architecture Strengths

Clear Separation: Models, logic, API, UI are distinct
Type Safety: Full TypeScript with strict mode
Testable: Pure functions in /lib/
Scalable: Clean foundation for complex features
Documented: Schema, types, logic are self-documenting
Accessible: Semantic HTML from shadcn/ui
Localization Ready: Messages as functions, types support i18n

---

## Next Developer Onboarding

Week 1:
- Read this CLAUDE.md thoroughly
- Review /prisma/schema.prisma
- Explore /lib/rollover.ts, runway.ts, tax.ts
- Set up local database

Week 2:
- Implement API routes (budgets, transactions)
- Add NextAuth flows
- Basic testing

Week 3:
- Build components (dashboard, forms)
- Create pages and routing
- Connect frontend to API

---

Generated: October 2024
Status: Early Development
Foundation: Complete
Next Phase: API and Frontend Implementation

