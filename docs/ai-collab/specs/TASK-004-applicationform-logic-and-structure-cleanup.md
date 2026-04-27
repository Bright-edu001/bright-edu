# TASK-004｜ApplicationForm Logic and Structure Cleanup

## Summary

Refactor the `ApplicationForm` component to reduce repetitive field markup and improve maintainability, without changing UI behavior, field order, validation, submission, or wording.

## Goal

- Reduce repetitive JSX in `ApplicationForm.jsx`.
- Improve field rendering consistency and maintainability.
- Validate a low-risk technical refactor task within the current workflow.

## Scope

- Review the structure of `ApplicationForm` only.
- Refactor repeated field declarations into a cleaner internal rendering pattern if it remains low-risk.
- Preserve current field order, field names, placeholders, aria-labels, and class usage.
- Allow only minimal SCSS compatibility adjustments if they are strictly required by the refactor.

## Non-goals

- Do not redesign the form.
- Do not change wording or placeholder content.
- Do not change field order.
- Do not add or remove fields.
- Do not modify validation or submission behavior.
- Do not refactor `useFormSubmit`.
- Do not expand to other forms or shared abstractions.

## Affected Module

- Frontend

## Allowed Files

- To be finalized after repository inspection

## Reference-Only Files

- To be finalized after repository inspection

## Disallowed Files

- `src/admin/`
- `src/services/`
- `src/context/`
- `functions/`
- `firestore.rules`
- `storage.rules`
- `.github/`
- `docs/ai-collab/`
- files unrelated to `ApplicationForm`
- hooks or backend logic unless explicitly required and re-scoped

## UI Impact

- No intentional UI change is expected.
- The visual result should remain effectively the same.
- Any SCSS change must be compatibility-only, not visual redesign.

## Data / Security Impact

- None expected.
- This task should not affect Firebase, auth, backend, rules, or Cloud Functions.

## Acceptance Criteria

- `ApplicationForm.jsx` contains less repetitive field markup.
- Field rendering remains readable and maintainable.
- Field order and visible output remain unchanged.
- Existing validation, submission, and variant behavior remain intact.
- No unrelated component or layout changes are introduced.

## Test Cases

- Compare field order before and after refactor.
- Compare field names, placeholders, and aria-labels before and after refactor.
- Smoke test form submission behavior.
- Check the form on desktop, tablet, and mobile for no visual regression.
- Confirm no unrelated files were modified.

## Risks

- Over-abstraction may reduce readability instead of improving it.
- Input and textarea rendering paths may diverge in subtle ways.
- Shared form usage may reveal assumptions not obvious from a single page context.

## Validation Level

- Smoke test

## Worktree Recommendation

- Optional

## Plan Notes

- Prefer the smallest refactor that reduces repetition.
- If the cleanup requires hook or data-layer changes, stop and surface the dependency instead of expanding scope.
