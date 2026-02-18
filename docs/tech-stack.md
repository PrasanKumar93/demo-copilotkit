# Tech Stack

## Backend

| Layer      | Tech                       | Why                              |
| ---------- | -------------------------- | -------------------------------- |
| Runtime    | Node.js 18+                | native fetch, stable ESM         |
| Language   | TypeScript ^5              | type safety                      |
| Framework  | Express ^4                 | simple, huge ecosystem           |
| Database   | MongoDB + native driver ^6 | no ORM overhead, full control    |
| Validation | Zod ^3                     | TS-first, runtime + type infer   |
| Config     | dotenv                     | env vars → process.env           |
| Security   | helmet, cors               | HTTP headers, CORS               |
| Dev Server | tsx + nodemon              | fast TS exec, auto-restart       |
| Testing    | Vitest + supertest         | fast ESM-native, HTTP assertions |
| Linting    | ESLint ^9 + TS plugin      | code quality                     |

### Scripts

`dev` → nodemon+tsx | `build` → tsc | `test` → vitest | `lint` → eslint

---

## Frontend

| Layer      | Tech                         | Why                            |
| ---------- | ---------------------------- | ------------------------------ |
| Framework  | Next.js 16 (App Router)      | SSR, routing, React 19         |
| Language   | TypeScript ^5                | type safety                    |
| UI Library | MUI ^7 + @mui/x-date-pickers | component library, date picker |
| Styling    | Emotion + SCSS modules       | CSS-in-JS + scoped styles      |
| Validation | Zod ^4                       | form validation, type infer    |
| Date Utils | dayjs                        | lightweight date handling      |
| Testing    | Vitest + Testing Library     | fast, React testing utils      |
| Linting    | ESLint ^9 + next config      | code quality                   |

### Scripts

`dev` → next dev | `build` → next build | `test` → vitest | `lint` → eslint

---

## Design Decisions

- **MongoDB native vs Mongoose** → lighter, faster, Zod handles validation
- **Zod** → schema = TS type, no duplication
- **Vitest vs Jest** → native ESM, faster, same API
- **tsx vs ts-node** → esbuild-powered, zero config
- **Co-located tests** → `*.test.ts` next to source
- **SCSS modules** → scoped styles per component
- **MUI** → consistent design system, accessible
