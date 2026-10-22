# Giofitness

Fully open Georgian fitness app built with Next.js App Router, React, TypeScript, Tailwind CSS v4 and Lucide. No accounts, authentication, backend connection or environment variables are required.

Production: https://giofitness.vercel.app

## Run

Use Node 24 (tests use built-in TypeScript stripping).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Validation and production commands:

```sh
npm test
npm run typecheck
npm run build
npm start
```

## Features

- Georgian dashboard with separate home and gym plans, three levels and an interactive 28-day, four-week calendar.
- 120 exercises, searchable by Georgian or English name, with level, equipment and muscle filters. Six categories: full body, abs, chest, arms, legs and back.
- Every exercise includes Georgian instructions, benefits and targeted muscles. Each exercise plays a specific YouTube demonstration inside its detail dialog, using the privacy-enhanced embed host, inline playback and fullscreen controls. No external search or redirect is needed. Video controls request Georgian localization; creator audio may be in another language. Georgian written instructions remain below the player.
- Workout builder with order, sets, repetitions/time, rest and up to 40 exercises per routine.
- Browser-local drafts, routines and progress. No sign-in gates or cloud requests. Export/import routine JSON to move routines between devices. Clearing browser storage can remove local saves; export backups first.
- Import merges routines without replacing existing saved routines. Opening another routine preserves a changed draft as a local backup.
- Self-hosted Georgian font, keyboard-accessible dialogs and responsive layouts.

## Data preservation

This release does not change or delete any Supabase tables, accounts, policies or existing workouts. Historical cloud workouts remain private in the existing database and are not exposed through the open app. The app no longer loads the Supabase client or reads authentication storage.

`supabase/schema.sql` is an archival schema from an earlier release. It is not used by this app and must not be run against the existing database. No migration is needed.

## Deployment

Vercel project `giorgi92/fitbod-landing`, root `./`, Next.js framework, production domain `giofitness.vercel.app`. The old `fitbod-landing.vercel.app` redirects to it. `vercel.json` configures `npm ci` and `npm run build`. No environment variables are needed. Existing Vercel variables may remain unused.

## Main sources

- `src/components/fitness-app.tsx`: open dashboard, calendar, catalog, detail dialog, builder, local persistence and import/export.
- `src/lib/catalog.ts`: exercise catalog and workout-item validation.
- `src/lib/program.ts`: home/gym classification, 28-day plans and routine import validation.
- `src/lib/exercise-details.ts`: Georgian movement instructions, benefits and demonstration mappings.
- `src/app/open.css`: dashboard and responsive styling.
- `tests/catalog.test.ts`, `tests/program.test.ts`: catalog integrity, plan variants, exercise detail coverage and import validation.

## Embedded demonstration videos

`src/lib/exercise-videos.ts` maps all 120 exercises to public creator-hosted YouTube demonstrations, with source titles for maintenance. IDs were checked using YouTube oEmbed on 2026-10-22. `src/components/exercise-video.tsx` renders a responsive 16:9 iframe only while the detail dialog is mounted. Closing the dialog removes the player and stops playback. Reloading a video stays on the same page. Referrer policy is `strict-origin-when-cross-origin`, which supplies the origin required by YouTube embeds. No autoplay is requested.

Videos remain hosted by their creators and are embedded through YouTube; no video files are copied. Initial mappings were researched from public YouTube results and https://github.com/yuhonas/free-exercise-db/pull/24 (dataset snapshot 2ec14c1f1d866cddd6565c8eaa85ee54ed9716df), then reviewed and corrected for exact movements. Third-party availability and regional restrictions can change; update the corresponding video ID if a creator removes or restricts a video.
