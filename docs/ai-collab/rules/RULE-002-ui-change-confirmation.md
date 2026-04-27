# RULE-002｜UI Changes Must Be Defined Before Implementation

## Summary

UI-related changes must be described explicitly before implementation begins.

## Rule Statement

Any task affecting layout, styling, spacing, visible content, navigation, or section structure must define:

1. what will visibly change,
2. which page or section is affected,
3. what will not be changed.

## Rationale

This reduces ambiguity and prevents AI from turning a small UI task into a broader redesign or cleanup task.

## Applies To

- UI tasks
- content presentation tasks
- responsive layout tasks
- section-level cleanup tasks

## Evidence

UI tasks become significantly more controllable when the visible target and non-target areas are defined before Agent execution.

## Good Examples

- Adjust mobile navbar spacing below 768px only. Do not change desktop layout.
- Refine hero copy spacing only. Do not redesign the section structure.

## Bad Examples

- Improve the homepage UI.
- Make this page cleaner.
- Refresh the section design a bit.

## Status

Active
