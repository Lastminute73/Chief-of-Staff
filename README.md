# Chief of Staff — archived

**These apps moved.** Blended Rhythm and the Workout tracker were rebuilt as
part of **Zachs Agent** — one phone app, one login, one database — at
https://zachsagent.com. Source: https://github.com/Lastminute73/zachs-agent.

This repository is frozen as-is so the GitHub Pages site keeps working until
the data has been carried over:

1. Open the Workout app here → **Export / Import data** → Copy.
2. In Zachs Agent → Settings → **Import from Chief of Staff** → paste → Import.

Nothing here is maintained after that. What the apps did is documented in the
new repository under `docs/research/2026-09-03-chief-of-staff-reverse-engineering.md`.

## Live apps (frozen)

- **Blended Rhythm** — `/blended-rhythm/` — daily operating console (Big Rocks, time blocks, journal, week + month view)
- **Workout Schedule** — `/workout-app/` — 12-week bike + lift tracker

State persists in `localStorage` per device. No backend.
