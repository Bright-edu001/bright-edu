# AGENTS.md

Repo-local execution guide for AI coding agents working on `Bright-edu001/bright-edu`.

This file is intentionally lightweight. It should guide safe implementation, validation, and reporting inside this repository. It is not a task history log, Notion replacement, or product decision record.

## Project Overview

Bright-Edu is a React / Vite web project with:

- Public school website routes
- Admin dashboard under `/admin`
- Firebase integration
- Vitest unit/integration tests
- Playwright E2E tests
- SCSS styling
- Ongoing public-site Ant Design boundary cleanup
- Admin-side Ant Design usage retained

## Source of Truth

Use the current user task brief as the primary source of truth.

When task instructions conflict with old docs, stale comments, or previous summaries, follow the current task brief and report the conflict.

Do not assume Notion, GitHub PRs, deployment status, or production status were updated unless the task explicitly required it and the action was actually completed.

## Default Branch

The normal working branch is:

```text
feature/test-preview
```

Before modifying files, inspect the current branch and working tree:

```bash
git status --short --branch
```

## Git Rules

General rules:

Do not push unless explicitly instructed.
Do not deploy unless explicitly instructed.
Do not create, merge, or close PRs unless explicitly instructed.
Do not rewrite history.
Do not revert user changes unless explicitly instructed.
Do not modify unrelated dirty files.
Keep commits small and scoped to the task.
If unrelated dirty files exist, report them and only touch the allowed files.

Recommended final checks before reporting:

git status --short --branch
git diff --name-only

## Common Validation Commands

For most implementation tasks, run:

npm run lint
npm run test:run
npm run build
git diff --check

For production-build-specific work, use:

npm run build:prod

For navigation or Header-related work, also run:

npx playwright test e2e/navigation.spec.js

For emulator-related workflows, available scripts include:

npm run emulator:start
npm run emulator:sync:prod
npm run emulator:start:with-sync

Use emulator commands only when the task explicitly requires emulator behavior.

## Known Validation Notes

Known or recurring warnings may appear depending on environment and task history:

Vite build chunk-size warning
Sass legacy JS API deprecation warning
Vite CJS Node API warning in some tool paths
CRLF/LF noise in snapshots
Sandbox/process EPERM failures in restricted environments

Do not treat known warnings as new failures unless the current task changes the related area.

If snapshot or line-ending noise appears accidentally, restore it unless the task explicitly targets that file.

## Project Structure Notes

Important paths:

src/
  App.jsx
  App.scss
  index.jsx
  router.jsx
  admin/
    App.jsx
    layouts/
    pages/
  components/
    Header/
    Footer/
  config/
  context/
  hooks/
  pages/
e2e/
scripts/

Known project-specific rule:

src/pages/Ou/

This is an intentional reserved empty folder. Preserve it. Do not remove it as cleanup.

## Dependency Rules

Do not modify dependency files unless the task explicitly requires it.

Restricted by default:

package.json
package-lock.json
scripts/package-lock.json

If package changes are required:

Keep dependency changes minimal.
Preserve existing package manager behavior.
Report peer dependency or install conflicts exactly.
Do not introduce new libraries for small UI changes, local refactors, selector fixes, or simple styling work without explicit approval.
## Firebase and Environment Rules

Do not change Firebase project IDs, deployment targets, secrets, workflow files, or environment variable names unless explicitly required.

Restricted by default:

firebase.json
.firebaserc
.env
.env.*
.github/workflows/**
src/config/firebaseCore.jsx
src/config/firebase.jsx

Environment rules:

Never commit real secrets.
Browser code should use Vite-compatible env access.
Do not introduce unguarded process.env usage in browser code.
Preserve emulator, local, preview, and production boundaries.
Do not weaken auth or admin fallback guards.
## Public vs Admin Ant Design Boundary

Current intended boundary:

Public root app should not require a global Ant Design provider.
Admin app may keep Ant Design usage and its own provider boundary.
Header may still use AntD for desktop navigation unless the task targets Header migration.
Do not introduce new AntD usage into public pages, public hooks, or public app shell.
Do not remove admin AntD usage unless the task explicitly targets admin.

Useful check:

grep -R "from 'antd'\|from \"antd\"\|@ant-design/icons" src/App.jsx src/pages src/components src/hooks

Interpret results carefully:

src/components/Header/** may still intentionally contain AntD while Header migration is incomplete.
src/admin/** is a separate admin boundary and may contain AntD.
## Header Rules

Header work is higher risk because it affects desktop navigation, mobile navigation, routing, accessibility, and E2E tests.

Typical Header-related files:

src/components/Header/Header.jsx
src/components/Header/Header.scss
src/components/Header/headerMenuHelpers.jsx
src/config/menuConfig.jsx
e2e/navigation.spec.js

Preserve unless explicitly changed:

Existing navigation paths
Desktop submenu behavior
Mobile drawer open/close behavior
Escape key close behavior
Backdrop close behavior
Body scroll lock while mobile drawer is open
Repeated-click URL stability, especially avoiding /blog/blog
Desktop/mobile breakpoint behavior

E2E guidance:

Prefer project-owned selectors such as header, .header-nav, .mobile-nav-toggle, .mobile-drawer.
Do not couple new tests to AntD internal DOM selectors.
Use visible labels and hrefs where stable.
## Admin Contact Forms Notes

The Contact Forms admin page has already been split into smaller units.

Known files include:

src/admin/pages/ContactFormsPage.jsx
src/admin/pages/ContactFormsPage.helpers.jsx
src/admin/pages/ContactFormsToolbar.jsx
src/admin/pages/ContactFormsTableColumns.jsx
src/admin/pages/ContactFormDetailModal.jsx
src/admin/pages/ContactFormEditModal.jsx
src/admin/pages/ContactFormAutoSyncModal.jsx
src/admin/pages/useContactFormsManualSync.jsx

Rules for this area:

Keep Firestore write behavior in the page or existing service layer unless the task explicitly moves it.
Keep presentational modal components presentational.
Do not mix behavior fixes with structure-only refactors unless requested.
Preserve AntD message text, key, and duration values unless explicitly changing UX.
Do not change Google Sheets sync endpoints or service contracts unless explicitly required.
Preserve existing manual sync guard behavior unless the task targets it.
## Testing Rules

General:

Do not delete tests to make validation pass.
Do not weaken assertions unless behavior intentionally changed.
For refactors, preserve user-visible behavior.
Add regression tests for bug fixes when practical.
For selector-only or E2E cleanup, avoid production behavior changes.

Vitest:

npm run test:run

Playwright navigation:

npx playwright test e2e/navigation.spec.js

Lint:

npm run lint

Build:

npm run build

Diff whitespace check:

git diff --check

## Styling Rules

The project uses SCSS.

General rules:

Prefer existing class naming and file-local conventions.
Avoid broad global selectors unless the file already owns that global surface.
Do not add new public AntD selector coupling.
Keep responsive behavior explicit.
Avoid changing visual design outside task scope.
Preserve accessible focus indicators unless replacing them with an equivalent accessible treatment.
## Accessibility Rules

For interactive UI:

Use native buttons for actions.
Preserve keyboard access.
Preserve Escape close behavior where already implemented.
Use aria-label, aria-expanded, aria-controls, role, and aria-modal where appropriate.
Loading UI should expose status semantics where practical.
Notifications should use role="alert" or role="status" where appropriate.
## Code Style Rules

General:

Keep changes minimal and local.
Prefer clear names over clever abstractions.
Avoid broad rewrites.
Avoid unrelated formatting-only diffs.
Avoid moving ownership of state, side effects, routing, or services unless explicitly required.
Keep service orchestration out of presentational components.

React-specific:

Preserve hook dependency correctness.
Avoid changing route boundaries unless task scope includes routing.
Use small presentational components for JSX extraction.
Keep side effects explicit and testable.
## Performance Rules

When doing performance work:

Prefer route-level or component-level lazy loading over broad architectural rewrites.
Validate with npm run build.
Report build output observations, but do not chase all chunk warnings unless the task is specifically about chunk splitting.
Do not remove dependencies only because they appear large; first confirm actual usage and task scope.
## Documentation Rules

Docs-only tasks should not modify runtime code.

For docs tasks:

Keep edits minimal and accurate.
Do not invent workflow policy.
Do not add stale references to removed docs.
Do not claim a command exists unless it is present in package.json.
If uncertain, add a short TODO rather than guessing.
## Forbidden by Default

Unless explicitly allowed by the current task, do not modify:

.github/workflows/**
firebase.json
.firebaserc
.env
.env.*
package.json
package-lock.json
scripts/package-lock.json
docs/legacy/**
docs/ai-collab/**

Also do not:

Push
Deploy
Create releases
Rewrite Git history
Perform broad formatting-only changes
Remove intentional empty directories
Change unrelated snapshots
Modify unrelated generated files
## Completion Report Format

At the end of a coding task, report:

Branch:
Commit:
Files changed:
Summary:
Validation:
Known warnings:
Not changed:
Risks / follow-up:

Be explicit when true:

No push.
No deploy.
No PR.
No Notion write.
No Firebase config change.
No package change.

Do not claim a validation command passed unless it was actually run and passed.

## Suggested Commit Message Style

Use concise conventional-style messages where practical:

refactor: extract contact form detail modal
fix: resolve auth fallback guard
test: decouple header navigation e2e selectors
perf: lazy-load admin route shells
docs: clarify local env setup

## When to Stop and Report

Stop and report instead of guessing when:

The prerequisite branch or commit is missing.
The requested file does not exist.
The task requires files outside allowed scope.
The working tree has unrelated dirty changes that may conflict.
Validation fails for reasons outside the task scope.
Required secrets, Firebase access, or external services are unavailable.
The change would require push, deploy, PR, or production action without explicit approval.
