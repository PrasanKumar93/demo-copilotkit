# Backend Structure

```
backend/src/
├── config/env.ts          → env vars → typed obj
├── api/                   → req handlers, tests co-located
├── middleware/            → express middleware (error handling)
├── routes/index.ts        → route aggregator → api
├── schemas/index.ts       → zod validation schemas
├── types/index.ts         → shared TS types/interfaces
├── utils/
│   ├── mongodb/           → CRUD + connection w/ zod validation
│   │   ├── connect.ts     → connectDB, getDB, closeDB, isConnected
│   │   ├── create.ts      → createOne
│   │   ├── read.ts        → findOne, findMany, countDocuments
│   │   ├── update.ts      → updateOne
│   │   ├── delete.ts      → deleteOne, deleteMany
│   │   └── index.ts       → barrel exports
│   └── response.ts        → API response helpers
├── app.ts                 → express app config
└── server.ts              → entry point
```

## Key Patterns

- **routes** → **api**
- tests: `*.test.ts` co-located with source
- validation: zod (database) schemas in `/schemas`
- env: `/config/env.ts` single source of truth

---

# Frontend Structure

```
frontend/src/
├── app/                   → Next.js 15 App Router
│   ├── layout.tsx         → root layout (Header, Footer, ThemeProvider)
│   ├── page.tsx           → home page
│   ├── globals.scss       → global styles
│   ├── students/          → /students route
│   │   ├── page.tsx       → list all students
│   │   └── new/page.tsx   → create student form
│   └── examples/page.tsx  → UI component showcase
├── components/
│   ├── business/          → domain-specific components
│   │   └── StudentRegistrationForm/  → form + hooks + types
│   ├── layout/            → Header, Footer
│   │   └── index.ts       → barrel exports
│   └── ui/                → reusable UI components
│       ├── Button/        → action buttons
│       ├── TextInput/     → text fields
│       ├── EmailInput/    → email validation
│       ├── TelInput/      → phone input
│       ├── NumberInput/   → numeric input
│       ├── Select/        → dropdown
│       ├── DatePicker/    → date selection
│       ├── Toast/         → notifications
│       ├── ThemeProvider/ → MUI theme wrapper
│       ├── types.ts       → shared UI prop types
│       └── index.ts       → barrel exports
├── lib/
│   ├── api.ts             → fetchApi, postApi + endpoint methods
│   └── validators.ts      → form validation utils
├── styles/
│   ├── typography.scss    → font styles
│   └── variables/         → _colors, _fonts, _spacing scss vars
├── hooks/                 → custom React hooks
└── types/index.ts         → shared TS types (Student, ApiResponse)
```

## Key Patterns

- **app/** → pages, **components/** → UI
- tests: `*.test.tsx` co-located with source
- styles: SCSS modules (`*.module.scss`) per component
- ui components: `Component/` folder w/ Component.tsx + .module.scss + .test.tsx + .example.tsx
- api: `/lib/api.ts` single source for backend calls
- env: `NEXT_PUBLIC_API_URL` for backend endpoint
