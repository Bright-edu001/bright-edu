---
description: "React component technical guidance for components, pages, props, state, effects, rendering, accessibility, and styling integration."
applyTo: "src/components/**,src/pages/**"
---

# React Component Technical Instructions

Keep React changes focused, readable, and consistent with nearby components.

## Component Structure

- Prefer small components with a single clear responsibility.
- Follow the surrounding file organization before introducing a new structure.
- Keep component names descriptive and aligned with exported filenames.
- Avoid broad app architecture changes from component-level tasks.

## Props And State

- Keep props explicit and pass only the data a component needs.
- Validate assumptions at component boundaries where the surrounding code already does so.
- Keep state local unless shared state is already part of the existing design.
- Derive values during render when possible instead of duplicating state.

## Effects And Data Flow

- Use effects for synchronization with external systems, not for ordinary data derivation.
- Keep dependency arrays accurate.
- Clean up subscriptions, timers, observers, and async side effects when needed.
- Preserve existing data fetching and routing patterns unless the task explicitly changes them.

## Rendering And Accessibility

- Keep conditional rendering easy to follow.
- Preserve loading, empty, and error states when touching user-facing flows.
- Use semantic HTML where practical.
- Keep interactive elements keyboard-accessible and provide labels for controls that need them.

## Styling Integration

- Match the local styling pattern used by the component or page.
- Use existing SCSS, SCSS modules, styled-components, or library styling conventions as found nearby.
- Do not introduce a new styling library for a component cleanup.
- Keep class names stable when they are used by tests, scripts, or existing styles.

## Review Checklist

- Component behavior remains within the approved task scope.
- Props, state, effects, and rendering paths are simple and maintainable.
- Accessibility is not regressed.
- Styling changes follow the nearby pattern.
