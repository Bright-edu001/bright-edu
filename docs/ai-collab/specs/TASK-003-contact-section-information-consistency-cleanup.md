# TASK-003｜Contact Section Information Consistency Cleanup

## Summary

Refine the public-site contact section to improve information consistency, formatting clarity, and presentation quality without redesigning the section or changing its underlying submission or data behavior.

## Goal

- Improve consistency and readability of the public contact section.
- Remove or correct clearly inconsistent, placeholder-like, or incomplete information presentation.
- Validate the workflow again using a low-risk, single-module frontend task.

## Scope

- Review the public-site contact section only.
- Clean up information formatting, labels, text consistency, and directly related presentation issues.
- Adjust small presentation details only when they directly support information consistency.
- Limit implementation to the contact section component and its directly related styling or local supporting files.

## Non-goals

- Do not redesign the contact section.
- Do not change form submission behavior.
- Do not modify backend, Firebase, email flow, or API logic.
- Do not add new fields or new features.
- Do not refactor unrelated shared components.
- Do not expand the task into a broader page redesign.

## Affected Module

- Frontend

## Allowed Files

- `src/components/Contact/Contact.jsx`
- `src/components/Application/ApplicationForm.jsx`
- `src/components/Application/ApplicationForm.scss`

## Reference-Only Files

- `src/components/SectionContainer/SectionContainer.jsx`
- `src/pages/Home/Home.jsx`
- `src/pages/Home/Home.scss`

## Disallowed Files

- `src/admin/`
- `src/services/`
- `src/context/`
- `functions/`
- `firestore.rules`
- `storage.rules`
- `.github/`
- `docs/ai-collab/`
- `src/components/Application/` files unrelated to `ApplicationForm`
- test files
- files unrelated to the public contact section

## UI Impact

- This task affects visible frontend contact-section presentation.
- The affected area is the public-site contact section only.
- Expected visible changes may include formatting cleanup, text consistency fixes, alignment cleanup, and placeholder removal where appropriate.
- The task should preserve the existing section identity and general layout.

## Data / Security Impact

- None expected.
- This task should not affect Firebase, auth, backend, rules, or Cloud Functions.

## Acceptance Criteria

- Contact information is presented in a more consistent and readable format.
- Labels, text, and presentation conventions are aligned within the contact section.
- Obvious placeholder or incomplete information is removed or corrected if confirmed in scope.
- Existing section behavior remains intact.
- No unrelated page section changes are introduced.

## Test Cases

- Inspect the contact section on desktop and verify text consistency, label consistency, and visual stability.
- Inspect the contact section on tablet and verify text consistency, label consistency, and visual stability.
- Inspect the contact section on mobile and verify text consistency, label consistency, and visual stability.
- Check whether any placeholder-like or obviously incomplete text remains.
- Confirm that unrelated sections and pages are unaffected.

## Risks

- The contact section may mix presentational content with form or data behavior.
- Information may be sourced from multiple files, increasing scope drift risk.
- Placeholder-like content may actually reflect unfinished product decisions, so removal must remain conservative.

## Validation Level

- Visual check
- Smoke test

## Worktree Recommendation

- Optional

## Plan Notes

- Finalize Allowed Files and Reference-Only Files after identifying the exact contact section files.
- If the task requires files outside the expected low-risk boundary, stop and surface the dependency before implementation.
