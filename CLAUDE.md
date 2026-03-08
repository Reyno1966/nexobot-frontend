# CLAUDE.md - NexoBot Frontend

This file provides guidance for AI assistants working in this codebase.

## Project Overview

NexoBot is a SaaS platform for creating and managing AI-powered chatbots. Built with Next.js 15 App Router, it integrates Supabase (auth + database), OpenAI (chat), Stripe (billing), and Resend (email).

## Tech Stack

- **Framework:** Next.js 15.5 with App Router (TypeScript)
- **UI:** React 19, Tailwind CSS v4
- **Auth + DB:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **AI:** OpenAI (`gpt-4o-mini` model)
- **Payments:** Stripe (checkout sessions + webhooks)
- **Email:** Resend
- **Fonts:** Geist Sans / Geist Mono (Next.js font loader)

## Directory Structure

```
app/
  api/                    # API route handlers (backend logic lives here)
    auth/                 # signup, login, logout, me, update-password, reset
    bots/                 # CRUD for chatbot configs; [id]/ for single bot ops
    chat/                 # OpenAI chat endpoint
    conversations/        # Conversation history
    appointments/         # Appointment scheduling
    products/             # Product/inventory management
    invoices/             # Invoice management
    dashboard/            # Aggregate dashboard stats
    profile/              # Profile info + logo upload
    stripe/               # create-checkout-session/, webhook/
    widget/               # Public embeddable chatbot API
  auth/                   # Auth pages: login, signup, reset
  dashboard/              # Protected dashboard pages + layout
  widget/                 # Embeddable chatbot UI (publicly accessible)
  checkout/               # Post-payment checkout pages
  [locale]/               # i18n pages (es, en, pt, fr, it, de, nl, ar, zh, ja, ru, ko, tr, id)
  privacy/                # Privacy policy
  terms/                  # Terms of service
  layout.tsx              # Root layout with metadata + fonts
  page.tsx                # Public landing page
  globals.css             # Tailwind base styles

components/
  dashboard/Sidebar.tsx   # Main navigation sidebar (mobile-responsive)
  LogoutButton.tsx        # Simple logout button

lib/
  auth.ts                 # getAuth() helper — validates token, auto-refreshes
  openai.ts               # OpenAI client wrapper with retry logic
  stripe.ts               # Stripe client initialization
  plans.ts                # Plan definitions and per-plan feature limits
  resend.ts               # Resend email client
  email.ts                # Email sending utilities
  emails/                 # Email templates (resetPasswordEmail.ts)

middleware.ts             # Route protection + legacy redirect rules
next.config.ts            # Security headers, ESLint on build
```

## Development Workflow

### Setup

```bash
cp .env.example .env.local
# Fill in all required values (see Environment Variables below)
npm install
npm run dev              # Starts at http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (ESLint runs here) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### No Testing Framework

There is no Jest/Vitest setup. The only "test" is a debugging endpoint at `app/api/test/route.ts`. When adding new tests, set up Vitest (preferred for Next.js 15 compatibility).

## Environment Variables

All required — copy from `.env.example`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # backend only, never expose to client

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
EMAIL_FROM=

# OpenAI (inferred from usage)
OPENAI_API_KEY=
```

Variables prefixed with `NEXT_PUBLIC_` are safe for client-side code. Never use `SUPABASE_SERVICE_ROLE_KEY` or `STRIPE_SECRET_KEY` in client components.

## Key Conventions

### Authentication Pattern

Every protected API route uses `getAuth()` from `lib/auth.ts`:

```typescript
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { supabase, userId } = auth;
  // proceed with supabase queries scoped to userId
}
```

`getAuth()` reads httpOnly cookies (`sb-access-token`, `sb-refresh-token`), auto-refreshes expired tokens, and returns a Supabase client + the authenticated `userId`. Never bypass this for user-facing routes.

### Client-Side API Calls

Always include credentials so cookies are sent:

```typescript
const res = await fetch("/api/bots", { credentials: "include" });
```

### API Route Structure

- One `route.ts` per directory
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Return `NextResponse.json(...)` with appropriate HTTP status codes
- All responses use English error messages internally; UI strings may be in Spanish (the app's primary language)

### Component Conventions

- Mark interactive components with `"use client"` at the top
- Prefer server components for data display pages
- Use Tailwind utility classes exclusively — no CSS modules, no styled-components
- Inline SVG icons (no icon library is installed)
- Loading states use spinner divs; error states render red text inline

### State Management

No global state library. Use:
- `useState` / `useEffect` for local component state
- Direct `fetch()` calls for server state (no React Query or SWR)
- `localStorage` for lightweight persistence (e.g., onboarding dismissal)

### Styling

- **Primary colors:** Teal `#2CC5C5`, Gold/Orange `#F5A623`
- **Background:** Dark (`#041414`, `#020D0D`, `#050816`)
- **Design patterns:** Glass-morphism (`bg-white/5 backdrop-blur-xl`), gradient text (`bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent`), card hover shadows
- **Responsive:** Mobile-first with `md:` and `lg:` breakpoints

### Naming Conventions

- Components: `PascalCase.tsx`
- Pages and API route directories: `kebab-case/`
- Utility files: `camelCase.ts`
- Path alias `@/` maps to the project root

## Route Protection

`middleware.ts` handles route guarding:

- **Public routes:** `/`, `/auth/*`, `/api/*`, `/checkout/*`, `/widget/*`, `/privacy`, `/terms`, `/{locale}/*`
- **Protected routes:** Everything else (especially `/dashboard/*`)
- Unauthenticated users hitting protected routes → redirect to `/auth/login`
- Authenticated users hitting `/auth/*` → redirect to `/dashboard`

## Subscription Plans & Limits

Plans are defined in `lib/plans.ts`. Bot usage is tracked on the `bots` table with:
- `messages_count` — total messages ever
- `messages_this_month` — monthly counter (reset based on `last_reset_at`)

Stripe webhooks in `app/api/stripe/webhook/route.ts` update user subscription status in Supabase when checkout/subscription events fire.

## OpenAI Integration

- Model: `gpt-4o-mini`
- Client initialized in `lib/openai.ts`
- Retry logic: up to 3 attempts with exponential backoff on failures
- Chat endpoint: `app/api/chat/route.ts`

## Internationalization

Localized pages live under `app/[locale]/`. Supported locales: `es` (default), `en`, `pt`, `fr`, `it`, `de`, `nl`, `ar`, `zh`, `ja`, `ru`, `ko`, `tr`, `id`. Primary UI language in non-localized routes is Spanish.

## Security Notes

- Never expose service role keys or Stripe secret keys to the client
- Security headers are configured in `next.config.ts` (nosniff, DENY framing, XSS protection)
- Cookies are `httpOnly` and `secure` in production
- Stripe webhooks are verified with `STRIPE_WEBHOOK_SECRET` before processing

## Common Gotchas

1. **ESLint runs on `build`** — fix lint errors before deploying, or the build will fail.
2. **Supabase service role key** is used for user creation (signup). Operations on behalf of users use the per-request token from cookies instead.
3. **Widget routes are public** — `app/widget/` and `app/api/widget/` have no auth guard by design (they're embedded in third-party sites).
4. **wrangler.toml is empty** — Cloudflare Workers config exists but is not active. Deployment target is likely Vercel or a Node.js server.
5. **No global loading state** — each page manages its own loading/error UI locally.
