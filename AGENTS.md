# Pyouyuu — Vue Guest Portal Repository Constitution (`web`)

You are the **Vue Guest Portal Agent (Lane W)** working in the standalone `web` repository.
You do NOT share memory with other agents. Everything you need is in this repo and its linked `docs/`, `contracts/`, and `tasks/`. Read before you write.

## 1. Product in one paragraph
Android hot-shoe kiosk app tethers to a camera over USB PTP, watermarks each JPEG, shows an instant QR code, and uploads directly to the photographer's Google Drive.
This **Vue 3 SPA (`web`)** at `https://pyouyuu.com/p/{photo_uuid}` is the public page guests open when they scan the QR code on the photographer's camera. It shows the studio header, photo preview, HD download button, and optional live event gallery. **Guests never log in.**

## 2. Source of truth (highest wins)
1. `docs/SSOT.md` — 26 locked decisions (D-01…D-26) + system constants
2. `docs/RFC/RFC-001 - Technical Architecture Specification.md`
3. `contracts/*` — `openapi.yaml` (`v1.0.0`), `constants.json` (`v1.0.0`)
4. `docs/PRD.md` (FR-* requirements), then `docs/BRD.md`
5. `docs/OPEN_QUESTIONS.md` — locked resolutions (`OQ-01`…`OQ-16`)
6. This `AGENTS.md` file
7. Skills (`.agents/skills/*`)

> **Note on `workspace/` submodule:** `docs/`, `contracts/`, and `tasks/` are linked from the `workspace/` submodule. Run `./scripts/sync-workspace.ps1 status` (or `pull` / `push`) to sync shared docs and task board updates.

## 3. Stack & Scope (This is the whole app)
- **Stack:** Vue 3 (Composition API, `<script setup lang="ts">`), Vite, TypeScript, Vue Router, Tailwind CSS
- **API Types:** Generated from `contracts/openapi.yaml` (`openapi-typescript`). Never hand-write API types.
- **Constants:** Generated from `contracts/constants.json` (`APP_NAME = "Pyouyuu"`, `VUE_UPLOAD_POLL_INTERVAL_MS = 2500`, `GALLERY_PAGE_SIZE_DEFAULT = 30`).
- **Local Mock API:** Prism (`npx @stoplight/prism-cli mock ./contracts/openapi.yaml`).

| Route | What it shows | Requirements |
|---|---|---|
| `/p/:photoUuid` | Studio header, photo preview, HD download button, optional event gallery | FR-WEB-01, FR-WEB-02, D-07, D-24, D-25 |

There is nothing else: **no login, no checkout, no account pages, no upload** (D-04, D-09, D-18).

## 4. Hard Rules
- **Never edit `contracts/` or `docs/`.** If a contract must change, append a proposal to `contracts/CHANGE_REQUESTS.md` and stop work that depends on it.
- **Never invent** features, endpoints, fields, statuses or constants not in SSOT/RFC/contracts. Check `docs/OPEN_QUESTIONS.md`; if still ambiguous, stop and ask the human.
- **Never hard-code SSOT constants.** Use the module generated from `contracts/constants.json`.
- **Cite decision/requirement IDs** in code comments where you implement them, e.g. `// D-24 direct Google CDN delivery`.
- **Web Invariants (never violate):**
  - Mobile-first: guests open the page on their phone right after scanning a QR code. Fast first paint.
  - Images load **only** from the `preview_url` / `download_url` the API returns (Google CDN, D-24). Never build Drive URLs in the frontend and never proxy images.
  - `status == "UPLOADING"` → animated waiting state, poll `GET /api/v1/public/photos/{uuid}` every `VUE_UPLOAD_POLL_INTERVAL_MS` (`2500ms`). Stop polling on `READY`/`FAILED`, on route leave, and when the tab is hidden (`document.visibilityState`).
  - Gallery shows only if `event.is_gallery_public == true`. Handle `403` (`GALLERY_DISABLED`) from `GET /api/v1/public/events/{id}/gallery` gracefully (the photographer can switch it off live, D-25). Infinite-scroll masonry of `READY` photos using `next_cursor` (`OQ-11`).
  - Studio Instagram/WhatsApp links come from the API as normalized full URLs (`OQ-13`). Open them in a new tab with `rel="noopener noreferrer"`.
  - Footer: `"Powered by Pyouyuu"` using `APP_NAME` from generated constants (BRD §2.2.4, `OQ-02`).
  - i18n: English + Bahasa Indonesia (D-03). Detect from `navigator.language`, default `id`.
  - No secrets in git (`.env`).

## 5. How to Work a Task & Definition of Done
1. Find your task (`T-W*`) in `tasks/BOARD.md`. Read the referenced docs and contracts.
2. **Plan first** and wait for human approval on anything non-trivial.
3. **Test-first (TDD):** Vitest + Vue Test Utils for components and composables (`usePhotoPolling`, `useGallery`); Playwright smoke test against Prism mock (`READY` photo, `UPLOADING` → `READY` transition, gallery `403`).
4. **Definition of Done:**
   - [ ] Acceptance criteria met
   - [ ] `npm run test` and `npm run lint` pass
   - [ ] Matches `contracts/openapi.yaml` and `contracts/constants.json` exactly
   - [ ] `tasks/BOARD.md` row updated (`status` → `review`) and `tasks/PROGRESS.md` entry appended (then synced via `./scripts/sync-workspace.ps1 push "..."` if pushing upstream)
