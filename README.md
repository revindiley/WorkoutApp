# WorkoutApp

A phone-first workout tracker for a 3-day, glute-focused home program. Built with React and Vite in plain JavaScript.

Equipment the program assumes: adjustable dumbbells up to 55 lb, two 35 lb kettlebells, and an adjustable bench.

## What it does

- Picks the next session (Day A, B or C) and shows this week's progress.
- Logs weight and reps per set, shows last time's numbers, and suggests when to add weight.
- Starts a rest timer when a set is checked off.
- Runs a 2-week learning phase with easier exercise swaps, then the full program. Every 5th week is a deload.
- Links each exercise to YouTube form videos.
- Shows a finish screen with a rotating message, session stats and a real-world weight comparison. The screen can be saved as an image.
- Saves everything in the phone's browser storage. The History tab can save and restore a JSON backup.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. To test on a phone on the same Wi-Fi, run `npm run dev -- --host` and open the network URL.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes it to GitHub Pages at:

`https://revindiley.github.io/WorkoutApp/`

One-time setup: in the repo on GitHub, go to Settings, then Pages, and set Source to "GitHub Actions".

If the repo is renamed, update `base` in `vite.config.js` and the paths in `index.html` and `public/manifest.webmanifest`.

## Install on iPhone

Open the site in Safari, tap Share, then "Add to Home Screen". It opens full screen with its own icon.

## Project layout

```
src/
  App.jsx                 state, session flow, finish screen trigger
  data/program.js         exercises, learning-phase swaps, starting weights, video searches
  lib/schedule.js         week number, phases, deloads, progression hints
  lib/celebrate.js        finish messages and weight comparisons
  lib/shareCard.js        draws the finish screen as a PNG
  lib/storage.js          localStorage load, save and backup merge
  lib/files.js            share sheet or download fallback
  components/             one file per screen or widget
```
