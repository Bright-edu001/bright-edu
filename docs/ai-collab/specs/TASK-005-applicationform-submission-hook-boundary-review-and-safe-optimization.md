# TASK-005｜ApplicationForm Submission Hook Boundary Review and Safe Optimization

## Summary

Review the boundary between `ApplicationForm` and `useFormSubmit`, and apply only low-risk structural cleanup where behavior can remain unchanged.

## Goal

- Clarify the responsibility boundary between the form component and the submission hook.
- Identify and implement only safe, low-risk improvements.
- Continue validating the workflow with a bounded technical task.

## Scope

- Review `ApplicationForm` and its directly used submission hook only.
- Clarify whether rendering concerns and submission concerns are cleanly separated.
- Apply only low-risk cleanup if behavior can remain unchanged.
- Keep any implementation limited to the form component and its directly related hook.

## Non-goals

- Do not redesign the UI.
- Do not change wording or placeholders.
- Do not change field order.
- Do not change validation rules.
- Do not change submission results or backend behavior.
- Do not refactor other forms.
- Do not introduce broad shared abstractions.
- Do not modify service, logger, or API files.

## Affected Module

- Frontend

## Allowed Files

- `src/components/Application/ApplicationForm.jsx`
- `src/hooks/useFormSubmit.jsx`

## Reference-Only Files

- `src/services/contactService.js`
- `src/utils/logger.js`
- `src/pages/Home/Contact.jsx`
- `src/components/SectionContainer/SectionContainer.jsx`

## Disallowed Files

- `src/admin/`
- `src/services/` except `src/services/contactService.js` for inspection only
- `src/context/`
- `functions/`
- `firestore.rules`
- `storage.rules`
- `.github/`
- `docs/ai-collab/`
- other forms
- shared hooks unrelated to this form
- global styles
- components unrelated to `ApplicationForm`
- backend or API layers

## UI Impact

- No intentional UI change is expected.
- The visible behavior should remain effectively the same.

## Data / Security Impact

- None expected.
- This task should not affect Firebase, auth, backend, rules, or Cloud Functions.

## Acceptance Criteria

- Responsibility boundaries between the form and hook are clearer after the review or refactor.
- Any actual code change remains low-risk and behavior-preserving.
- Validation, submission, and visible form behavior remain unchanged.
- No unrelated files are modified.

## Test Cases

- Compare form behavior before and after changes.
- Smoke test submission flow.
- Confirm validation behavior remains unchanged.
- Confirm no visual regression.
- Confirm no unrelated files were modified.

## Risks

- The current hook may combine multiple concerns, making cleanup easy to over-scope.
- Refactoring could accidentally alter validation or submission timing.
- Hidden assumptions may exist if the hook is reused elsewhere.

## Validation Level

- Smoke test

## Worktree Recommendation

- Optional

## Plan Notes

- Prefer review-first and only implement changes that are clearly low-risk.
- Do not modify `contactService.js` or `logger.js`; inspect only.
- If the task requires backend, service, or broader shared-hook changes, stop and re-scope.
