# Advanced Grammar in Use (Interactive Edition)

Full-stack Next.js starter for an interactive advanced English grammar learning platform.

## Stack
- Next.js (App Router) + TypeScript
- TailwindCSS + shadcn-style UI components
- NextAuth (Email credentials auth, Google OAuth optional)
- Prisma + SQLite
- Zustand for global client state
- react-hook-form + zod for form validation

## Features included
- Email/password sign in and sign up (`/sign-in`)
- Protected units page (`/units`)
- Prisma models for users, units, progress, and exercise attempts
- Progress API (`GET/POST /api/progress`)
- Zustand store with `fetchProgress` and `updateProgress`
- Seeded grammar units grouped by topic
- Example validated form (`react-hook-form` + `zod`)

## Environment variables

Copy `.env.example` to `.env` and fill values:

```env
DATABASE_URL="file:./dev.db"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are optional now. If set, Google provider stays enabled in backend but is not shown in the default UI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create and apply migration:

```bash
npm run db:migrate
```

3. Seed grammar units:

```bash
npm run db:seed
```

4. Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run Prisma migrate dev
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio
