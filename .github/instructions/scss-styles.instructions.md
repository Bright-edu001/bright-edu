---
description: "SCSS technical guidance for stylesheets, variables, mixins, responsive rules, nesting, and Sass compatibility."
applyTo: "**/*.scss"
---

# SCSS Technical Instructions

Keep styles scoped, maintainable, and consistent with the surrounding stylesheet.

## Scope And Organization

- Match the existing stylesheet pattern before introducing a new one.
- Keep component styles near the component when that is the local convention.
- Use shared variables, mixins, and style entrypoints when they already exist.
- Avoid unrelated visual refactors in narrow style tasks.

## Naming And Nesting

- Keep class names descriptive and stable.
- Use the naming style already present in the file or component area.
- Limit nesting depth so selectors remain easy to override and reason about.
- Avoid global selectors unless the file already owns a global or library override.

## Variables, Mixins, And Imports

- Prefer existing variables and mixins for colors, spacing, typography, breakpoints, and shared layout behavior.
- Do not duplicate tokens that already exist in shared style files.
- Prefer modern Sass module patterns where the surrounding code uses them.
- Keep legacy imports only when changing them is outside the approved scope.

## Responsive Styles

- Keep breakpoints consistent with nearby styles.
- Make responsive adjustments local and explicit.
- Verify that text, controls, and fixed-format UI elements have stable dimensions where needed.
- Avoid layout shifts caused by hover, focus, loading, or dynamic content states.

## Sass Mixed Declarations

- When a mixin emits nested rules such as media queries or pseudo-selectors, keep plain declarations before the nested output or split the mixin into base and responsive parts.
- Avoid placing new declarations after nested rules if that would change Sass mixed-declaration behavior.
- Keep generated CSS order intentional and easy to inspect.

## Review Checklist

- Styles remain scoped to the approved files and behavior.
- Existing variables, mixins, and responsive conventions are reused where practical.
- Global leakage and selector specificity are controlled.
- Sass compatibility warnings are not introduced knowingly.
