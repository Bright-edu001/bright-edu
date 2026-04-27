# TASK-001｜Navbar Responsive Refinement

## Summary

Refine the public-site navbar responsive behavior to improve layout stability, spacing consistency, and usability on smaller viewports, without changing the overall navigation structure or expanding into a broader header redesign.

## Goal

- Improve navbar readability and usability on mobile and tablet viewports.
- Keep desktop behavior visually consistent unless a minor responsive compatibility fix is required.
- Validate the company workflow using a low-risk, single-module UI task.

## Scope

- Review and refine responsive behavior in the public-site header/navbar.
- Adjust spacing, alignment, wrapping, toggle visibility, collapse behavior, or overflow handling if needed.
- Fix clearly visible responsive issues in the global header/navbar area only.
- Limit implementation to the header component and its directly related stylesheet.

## Non-goals

- Do not redesign the site header.
- Do not rewrite navigation architecture.
- Do not change menu information architecture or route definitions.
- Do not modify admin navigation.
- Do not refactor unrelated shared components.
- Do not touch Firebase, backend, rules, or deployment configuration.
- Do not modify page-specific content-section headers or unrelated page styles.

## Affected Module

- Frontend

## Allowed Files

- `src/components/Header.jsx`
- `src/styles/Header.scss`

## Reference-Only Files

- `src/App.jsx`
- `src/components/AppSkeleton.jsx`
- `src/styles/AppSkeleton.scss`

## Disallowed Files

- `src/admin/`
- `src/services/`
- `src/context/`
- `functions/`
- `firestore.rules`
- `storage.rules`
- `.github/`
- `docs/ai-collab/`
- page-specific SCSS unrelated to the global header/navbar
- content-section header styles unrelated to the global site header
- admin-related components and styles

## UI Impact

- This task affects visible frontend navigation behavior.
- The affected area is the public-site global header/navbar only.
- Expected visible changes may include spacing correction, alignment refinement, responsive toggle behavior, overflow handling, and menu readability improvements on smaller screens.
- Desktop layout should remain effectively unchanged unless a small responsive compatibility adjustment is required.

## Data / Security Impact

- None expected.
- This task should not affect Firebase, auth, database access, rules, or Cloud Functions.

## Acceptance Criteria

- Navbar remains usable and readable on mobile viewport widths.
- Navbar remains usable and readable on tablet viewport widths.
- Desktop navbar is not unintentionally redesigned.
- Navigation items remain accessible and do not visually overlap, clip, or break layout in supported viewports.
- Any existing mobile menu toggle behavior continues to function correctly.
- No unrelated section or page layout changes are introduced.

## Test Cases

- Open the main public page on a mobile-sized viewport and verify navbar spacing, alignment, and readability.
- Open the main public page on a tablet-sized viewport and verify navbar spacing, alignment, and readability.
- Open the main public page on a desktop viewport and verify no unintended layout regression.
- If the navbar includes a menu toggle, open and close it on smaller viewports and verify the interaction still works.
- Navigate across at least 2 to 3 public pages and confirm the navbar remains visually stable.

## Risks

- Header styles may affect multiple public pages.
- Responsive fixes may unintentionally alter desktop spacing.
- Header layout and interaction logic may have tighter coupling than expected.
- If the actual issue depends on files outside the allowed boundary, the task may need to stop and be re-scoped instead of silently expanding.

## Validation Level

- Visual check
- Smoke test

## Worktree Recommendation

- Optional

## Plan Notes

- Reference-only files may be inspected for context but should not be modified.
- If implementation requires files outside the allowed boundary, stop and surface the dependency before proceeding.
