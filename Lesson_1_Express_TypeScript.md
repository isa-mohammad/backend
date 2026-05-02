# Backend Lesson 1: Robust Express & TypeScript Setup

## Overview
In a MERN stack interview for a mid-level role (2-3 years), interviewers look for more than just a basic `app.js` file. They expect to see:
- **TypeScript** usage for type safety.
- **Separation of Concerns** (Controllers, Routes, Services).
- **Error Handling** mechanisms.
- **Environment Variable** management.

## 1. Project Initialization

To start a professional Node.js project, you need a solid foundation. This involves initializing your package manager, installing the correct dependencies, setting up TypeScript, and configuring your `package.json` scripts for development and production.

### Step 1: Initialize npm
First, create a `package.json` file to manage your project's dependencies and scripts:
```bash
npm init -y
```

### Step 2: Install Dependencies
Install the core runtime dependencies:
```bash
npm install express cors dotenv mongoose
```

Install the development dependencies required for TypeScript compilation and developer experience (like auto-restarting the server):
```bash
npm install --save-dev typescript @types/express @types/cors @types/node nodemon ts-node ts-node-dev
```

### Step 3: Configure `package.json` Scripts
Open your newly created `package.json` and add scripts for building, developing, and running your application. This is crucial for a smooth developer workflow and deployment:

```json
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "seed": "ts-node src/seeders/user.seeder.ts"
  }
```

### Step 4: Set up TypeScript
Initialize the TypeScript configuration file (`tsconfig.json`):
```bash
npx tsc --init
```
*Tip: Open `tsconfig.json` and ensure `"outDir": "./dist"` and `"rootDir": "./src"` are set correctly so the compiled output is separated from your source code.*

## 2. Directory Structure
A clean structure is essential for clean code:
```
backend/
├── src/
│   ├── config/       # Database & Env configs
│   ├── controllers/  # Request handlers
│   ├── middlewares/  # Custom middlewares (e.g., error handlers, auth)
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic
│   └── index.ts      # Entry point
├── .env
└── tsconfig.json
```

## 3. The Entry Point (`src/index.ts`)
```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routes here

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Healthcheck Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Global Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## 🎯 Practical Challenge
**Your Task:**
1. Initialize the Node/Express project in this `backend` directory.
2. Set up TypeScript.
3. Create the folder structure above.
4. Implement a `UserController` and `UserRoute` that handles a `GET /api/users` request and returns a mock array of users.
5. Ensure the server starts using `ts-node-dev`.

*When you are ready or if you get stuck, let me know!*
