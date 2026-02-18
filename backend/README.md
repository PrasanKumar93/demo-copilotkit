# Backend - TypeScript Express MongoDB Starter

A TypeScript Node.js Express starter application with MongoDB integration using the native driver and Zod for schema validation.

## Features

- 🚀 **Express** - Fast, unopinionated web framework
- 📝 **TypeScript** - Type-safe development
- 🍃 **MongoDB** - Native driver (no Mongoose)
- ✅ **Zod** - Runtime schema validation with TypeScript inference
- 🧪 **Vitest** - Fast, modern test framework
- 🔒 **Helmet & CORS** - Security middleware
- 🔄 **Hot Reload** - Development with nodemon + tsx

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (optional - app runs without it)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file (optional)
cp .env.example .env
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

Server runs at `http://localhost:3000`

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Hello World

```
GET /api/hello
```

Response:

```json
{
  "success": true,
  "data": {
    "message": "Hello World"
  }
}
```

### Health Check

```
GET /api/health
```

Response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "mongodb": "connected"
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # Environment variables
│   ├── controllers/
│   │   ├── hello.controller.ts
│   │   └── hello.controller.test.ts
│   ├── middleware/
│   │   └── error.middleware.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── hello.routes.ts
│   ├── schemas/
│   │   ├── index.ts
│   │   └── index.test.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── mongodb/
│   │   │   ├── connect.ts      # MongoDB connection utilities
│   │   │   ├── create.ts       # Create operations
│   │   │   ├── read.ts         # Read operations
│   │   │   ├── update.ts       # Update operations
│   │   │   ├── delete.ts       # Delete operations
│   │   │   └── index.ts        # Re-exports all functions
│   │   ├── response.ts
│   │   └── response.test.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Compile TypeScript to JavaScript         |
| `npm start`             | Run production build                     |
| `npm test`              | Run tests in watch mode                  |
| `npm run test:run`      | Run tests once                           |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run lint`          | Run ESLint                               |
| `npm run lint:fix`      | Fix ESLint errors                        |

## MongoDB CRUD Utilities

The `src/utils/mongodb/` folder provides modular CRUD operations with Zod validation:

```typescript
import { z } from "zod";
import {
  createOne,
  findOne,
  findMany,
  updateOne,
  deleteOne,
} from "./utils/mongodb/index.js";

// Define schema
const UserSchema = z.object({
  _id: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
});

// Create
const user = await createOne(
  "users",
  { name: "John", email: "john@example.com" },
  UserSchema
);

// Find one
const found = await findOne("users", { email: "john@example.com" }, UserSchema);

// Find many
const users = await findMany("users", {}, UserSchema, { limit: 10 });

// Update
const updated = await updateOne(
  "users",
  { email: "john@example.com" },
  { name: "Jane" },
  UserSchema
);

// Delete
const deleted = await deleteOne("users", { email: "john@example.com" });
```

## Environment Variables

| Variable          | Default                              | Description               |
| ----------------- | ------------------------------------ | ------------------------- |
| `PORT`            | `3000`                               | Server port               |
| `NODE_ENV`        | `development`                        | Environment               |
| `MONGODB_URI`     | `mongodb://localhost:27017/demo_app` | MongoDB connection string |
| `MONGODB_DB_NAME` | `demo_app`                           | Database name             |

## Testing

Tests are co-located with source files (`*.test.ts`):

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm test

# Run with coverage
npm run test:coverage
```

## License

ISC
