# TASK-007｜MSFinanceSection Rendering Guard and Fallback Cleanup

## Summary

Refactor repeated rendering guard and fallback logic inside `MSFinanceSection.jsx` without changing visible output, wording, layout, routes, data source, image paths, styles, or backend/Firebase behavior.

## Goal

- Improve readability and maintainability of `MSFinanceSection.jsx`.
- Reduce repeated guard and fallback rendering logic.
- Preserve all current rendering behavior and visible output.
- Keep the task bounded to a single component file.

## Scope

- Modify only `src/components/Ms/MSFinanceSection.jsx`.
- Clean up repeated guard logic for optional arrays, strings, and conditional blocks.
- Clarify fallback logic for existing props such as:
  - `whyList`
  - `outcomesDesc`
  - `companyLogos`
  - `coreCoursePragaph`
  - `coreCoursesIntroList`
  - `coreCoursesList`
- Add small internal render helpers only if they improve readability without changing behavior.
- Preserve existing class names, visible copy, data shape, and rendering order.

## Non-goals

- Do not change UI appearance.
- Do not change wording or visible copy.
- Do not change layout.
- Do not change SCSS.
- Do not change routes.
- Do not change data source.
- Do not change image paths.
- Do not modify page-level content files.
- Do not modify backend, Firebase, services, or functions.
- Do not normalize all MS page structures.
- Do not remove empty `useEffect` hooks in this task.
- Do not introduce broad shared abstractions.

## Affected Module

- Frontend

## Allowed Files

- `src/components/Ms/MSFinanceSection.jsx`

## Reference-Only Files

- `src/pages/Uic/Ms/MSFinance.jsx`
- `src/pages/Uic/Ms/MsMarketing.jsx`
- `src/pages/Uic/Ms/MsManagement.jsx`
- `src/pages/Uic/Ms/MsAnalytics.jsx`
- `src/pages/Uic/Ms/MsAccounting.jsx`
- `src/pages/Uic/Ms/MsInformation.jsx`
- `src/pages/Uic/Ms/MsApplication.jsx`
- `src/components/MbaAreasHero/MbaAreasHero.jsx`
- `src/components/SectionContainer/SectionContainer.jsx`
- `src/utils/getImageUrl.jsx`
- `src/components/Ms/MSFinanceSection.scss`

## Disallowed Files

- `src/routes/`
- `src/config/menuConfig.jsx`
- `src/config/urlMapping.jsx`
- `src/constants/imagePaths.jsx`
- `src/pages/Uic/Ms/*.scss`
- `src/components/MbaAreasHero/MbaAreasHero.scss`
- `src/admin/`
- `src/services/`
- `src/context/`
- `functions/`
- `firestore.rules`
- `storage.rules`
- `docs/`
- `.github/`
- Notion records
- any file that would alter UI appearance, wording, layout, route, data source, image path, backend behavior, or Firebase behavior

## UI Impact

- No intentional UI change is expected.
- The visible output should remain effectively identical.

## Data / Security Impact

- None expected.
- This task must not affect Firebase, backend, services, routes, or data sources.

## Acceptance Criteria

- Repeated guard and fallback rendering logic in `MSFinanceSection.jsx` is reduced or clarified.
- Existing visible output remains unchanged.
- Existing wording remains unchanged.
- Existing layout and class names remain unchanged.
- Existing rendering order remains unchanged.
- Existing data source and image path behavior remain unchanged.
- No files outside `src/components/Ms/MSFinanceSection.jsx` are modified.

## Test Cases

- Compare rendering behavior before and after the refactor.
- Confirm `whyList` rendering behavior remains unchanged.
- Confirm `outcomesDesc` fallback behavior remains unchanged.
- Confirm `companyLogos` rendering behavior remains unchanged.
- Confirm `coreCoursePragaph`, `coreCoursesIntroList`, and `coreCoursesList` behavior remains unchanged.
- Smoke test MS program pages that use `MSFinanceSection`.
- Confirm no route, style, wording, data source, backend, Firebase, or Notion changes were made.

## Risks

- Over-abstraction may reduce readability instead of improving it.
- Conditional rendering behavior may change if guard logic is not preserved exactly.
- Visible copy could be accidentally touched because MS page content is wording-heavy.
- Scope may expand if page-level structure normalization is attempted.

## Validation Level

- Behavior comparison
- Smoke test

## Worktree Recommendation

- Not needed

## Plan Notes

- Prefer the smallest behavior-preserving cleanup.
- Do not modify page-level MS files.
- Do not modify SCSS.
- Do not change visible copy.
- If cleanup requires broader page structure changes, stop and re-scope into a separate task.
