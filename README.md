# giofitness

Responsive bilingual workout tracker built with Next.js App Router, React, TypeScript, Tailwind CSS v4 and Lucide. Production: https://giofitness.vercel.app

## Run

Use Node 24. No environment variables or database setup are required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm test
npm run typecheck
npm run build
npm start
```

## Application

- English/Georgian navigation, labels, charts, forms, instructions and embedded video controls. Language and kg/lbs preferences persist.
- Overview with workout totals, consecutive training-day streak, loaded volume, training minutes, recent sessions and weight vs goal chart.
- A clearly labeled **Demo** workspace starts with 18 sample workouts, 9 weigh-ins and a paused sample session. **Personal** starts without mock activity. Each workspace persists separately in this browser.
- Active workout logger: editable sets, repetitions/time and canonical kilograms, kg/lbs conversion, completed/current/pending states, pause/resume clock, rest timer, next exercise preview and completion review.
- Only completed sets count. Loaded volume is reps multiplied by kilograms; timed and bodyweight sets do not inflate loaded volume or estimated strength records.
- Interactive anterior/posterior recovery maps. Scores use completed sets and exponentially decaying stimulus over time. This is a transparent training heuristic, not a medical assessment.
- Progress analytics: estimated 1RM (Epley), best completed sets, 28-day/all-time filtering, weekly volume, weight entries and goal line. Charts have focusable points and labeled controls.
- 120 searchable exercises with six muscle filters, level/equipment/location filters, Georgian and English instructions and embedded demonstrations.
- Custom routine builder, built-in gym/home routines, and the retained 28-day home/gym program for three fitness levels. Time prescriptions are preserved when starting plan sessions.
- Export/import JSON backups. Import merges records without silently replacing existing history. Changed records with the same identifier receive a new identifier. Existing active sessions are retained.

## Full-stack architecture and persistence

- `GET /api/exercises`: public server-side exercise directory, optional `q`, `muscle`, `level` query parameters.
- `POST /api/workouts`: validates completed workout JSON (known exercises, numeric ranges, limits, timestamps and completed sets), then returns the validated log and volume/set summary. Invalid JSON returns 400; non-JSON returns 415; oversized payload returns 413. No response is cached.
- The client calls the workout endpoint before committing a finished session locally. If the server cannot be reached, the same shared validation runs locally and the UI reports that the record was saved on this device.
- **This release uses device-local persistence, not a central cloud workout database.** Workout payloads are sent transiently to the Vercel validation endpoint; the application does not write them to a server database or log request bodies. Cross-device transfer is through backup export/import.
- Workspace limits: 500 completed sessions, 1,000 weigh-ins, 100 custom routines, 40 exercises per session and 10 sets per exercise. The app reports a limit instead of pruning existing records.
- Personal routines and program marks from the previous open app are copied when initializing Personal for the first time. The original `giofitness.open.*` keys are not modified. Legacy cloud workouts remain private in Supabase and are not exposed by the open app.
- No authentication, account gates, service-role keys, destructive database operations or schema migration. The existing Supabase database, users and policies are unchanged. `supabase/schema.sql` remains an archival artifact and must not be applied to the existing database.

## Source modules

- `src/components/tracker-app.tsx`: navigation, workspace/language/unit controls and feature composition.
- `src/components/use-tracker.ts`: persistence, validation round trip, session lifecycle and backup merge.
- `src/components/tracker-overview.tsx`: overview, recovery, activity and analytics.
- `src/components/tracker-workout.tsx`: routine selection, set logger and timers.
- `src/components/tracker-library.tsx`: directory, exercise detail, routine/weight/history dialogs.
- `src/components/recovery-body.tsx`, `tracker-charts.tsx`: SVG visualizations and keyboard-accessible controls.
- `src/components/tracker-program.tsx`: interactive four-week plan.
- `src/lib/tracker.ts`: domain types, demo data, validation, volume, streak, records and recovery calculations.
- `src/lib/tracker-i18n.ts`: complete typed English/Georgian UI dictionary.
- `src/lib/exercise-copy.ts`: English movement instructions; existing Georgian instructions remain in `exercise-details.ts`.
- `src/app/tracker.css`: desktop, tablet and mobile layouts.
- `tests/tracker.test.ts`: calculation, persistence-model, unit, prescription and malformed-data regression checks.

## Videos

`src/lib/exercise-videos.ts` maps all 120 exercises to public creator-hosted YouTube demonstrations. IDs were checked using YouTube oEmbed on 2026-10-22. The responsive player uses the privacy-enhanced host, localized controls, fullscreen and inline playback, with no autoplay. Closing the dialog unmounts the iframe and stops playback. Creator audio can be in another language; bilingual written instructions remain below it. Videos remain hosted by their creators and may become unavailable if an owner removes or restricts them.

Initial mappings were researched from YouTube and the public exercise dataset at https://github.com/yuhonas/free-exercise-db/pull/24 (snapshot 2ec14c1f1d866cddd6565c8eaa85ee54ed9716df), then corrected for exact movements. No video files are copied.

## Deployment

Vercel project `giorgi92/fitbod-landing`, repository `giorgikukulava12345-bit/fitbod-landing`, root `./`, framework Next.js. Production domain: `giofitness.vercel.app`. `vercel.json` configures `npm ci` and `npm run build`. The main page and APIs run server-side; assets are served through Vercel. No environment variables are required. Existing Supabase variables may remain unused.

## Validation

14 automated tests cover catalog/plan integrity, video mapping coverage, workout validation, completed-set calculations, timed sets, canonical weight conversion, recovery decay, records and sample-workspace validity. Browser QA covers completing a workout through the API, history/analytics updates, reload persistence, language switching, exercise search and video embedding, weight entry, mobile logger layout and four-week navigation. Local API smoke checks exercise catalog search and successful/invalid/non-JSON workout submissions.
