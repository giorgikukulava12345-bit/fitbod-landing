# Giofitness / fitbod-landing

A responsive fitness landing page built with Next.js App Router, React, TypeScript, Tailwind CSS v4 and Lucide. Includes interactive phone mockups, responsive navigation, exercise accordions, FAQs, and Supabase email/password registration and sign-in.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local` instead of `cp` if preferred. Open http://localhost:3000.

```sh
npm run typecheck
npm run build
npm start
```

Webpack is selected explicitly to avoid a Turbopack child-process failure on the Windows authoring machine.

## Supabase

This site uses the separate `giofitness` project (`imdvuwizfoofukozestn`) in Frankfurt. The existing Geolingo project is untouched. `.env.example` includes only the public project URL and publishable client key; these may be delivered to the browser. Never use a service-role key in client code. No public database tables are required: account data is managed by Supabase Auth.

Email/password sign-up is enabled; email confirmation is required. Configure Authentication → URL Configuration → Site URL to the production URL. Default hosted email delivery is subject to Supabase's limits; configure custom SMTP before a larger public launch.

## Vercel

Import this GitHub repository as a new Vercel project, select Next.js, and keep Root Directory at `./`. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from `.env.example` for Production and Preview. Deploy. Later commits to `main` trigger deployments.

## Source structure

- `src/app/page.tsx`: main App Router page
- `src/app/globals.css`: Tailwind v4 import, theme and responsive design
- `src/components/landing.tsx`: navigation and landing sections
- `src/components/app-preview.tsx`: interactive phone mockups
- `src/components/muscle-map.tsx`: original SVG muscle diagram
- `src/components/auth-dialog.tsx`: accessible native modal with Auth integration
- `src/lib/supabase.ts`: public browser client

The visual concept is inspired by the supplied Fitbod direction and branded Giofitness. Sample workouts and phone screens are illustrative. No fabricated testimonials or app-store ratings are included. Native mobile apps and personalized workout generation are future product features, not implemented services.
