# Giofitness

English/Georgian fitness application: Next.js App Router, React, TypeScript, Tailwind CSS v4, Lucide and Supabase Auth/Postgres.

Production: https://giofitness.vercel.app

## Run

Node 24 is recommended (the test command uses built-in TypeScript stripping).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

PowerShell: `Copy-Item .env.example .env.local`. Open http://localhost:3000.

```sh
npm run test
npm run typecheck
npm run build
npm start
```

## Features

- 108 bilingual exercises: 36 per level, 12 per muscle group, seven equipment types.
- Search in Georgian or English and combine level, muscle and equipment filters.
- Starter routines for Beginner, Intermediate and Advanced levels.
- Workout builder: order exercises, remove them, edit sets, repetitions/seconds and rest. Up to 40 exercises per routine.
- Browser drafts survive refresh. Signed-in routines are saved to the user's Supabase account; saved routines can be reopened and updated.
- Username, email and password registration; email/password login. Username is a display name, not a unique login identifier.
- Auth restoration subscribes to initial sessions, token refresh and sign-out. No automatic modal reopening or async Auth calls inside the auth listener.
- English/Georgian preference persists locally and updates the document language.

## Supabase

Uses only the separate `giofitness` project `imdvuwizfoofukozestn`. Do not apply changes to the unrelated Geolingo project.

The public URL and publishable key are in `.env.example`. No service-role key is needed or shipped. Supabase handles password hashing and token storage. Display-name metadata is not used for authorization.

`supabase/schema.sql` records the schema and 108 seed rows applied to this project. Apply it only once to a new empty database, not repeatedly to production. Public catalog rows are read-only to clients. Workout policies check `auth.uid() = user_id` for each operation, including both ownership conditions on update. Database checks validate workout JSON ranges.

Auth settings: email/password signup enabled; immediate signup requires “Confirm email” OFF in Authentication → Sign In / Providers. No MFA challenge is implemented. Set Site URL to https://giofitness.vercel.app. Existing unconfirmed accounts may still need confirmation depending on provider behavior; never bulk-confirm unrelated users.

## Vercel

Project: `fitbod-landing`, root `./`, framework Next.js. Production domain: `giofitness.vercel.app`; the old `fitbod-landing.vercel.app` redirects to it. Keep the same Supabase environment variables for Production and Preview:

```env
NEXT_PUBLIC_SUPABASE_URL=https://imdvuwizfoofukozestn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<public key from .env.example>
```

`vercel.json` uses `npm ci` and `npm run build`. Dependencies are pinned and the lockfile is committed. Pages are statically rendered and interactive data loads directly through RLS-protected Supabase APIs. The webpack build avoids a Windows Turbopack worker issue.

Sessions are origin-specific; moving from the previous domain requires one new login. Afterwards, reloads and new tabs on the same domain restore the session.

## Main sources

- `src/components/app-providers.tsx`: shared auth state and locale
- `src/components/auth-dialog.tsx`: bilingual signup/login
- `src/components/fitness-app.tsx`: app UI, filters, workout editor and cloud saves
- `src/lib/catalog.ts`: bilingual exercise data and draft validation
- `src/lib/supabase.ts`: singleton browser client
- `src/app/fitness.css`: responsive app styling
- `tests/catalog.test.ts`: catalog and draft regression checks

The previous landing components remain in source for reference. The app now renders `FitnessApp` from `src/app/page.tsx`.
