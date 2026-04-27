# RULE-001｜Spec, Plan, Scope First

## Summary

All AI-assisted implementation tasks must define the spec, reviewed plan, and file scope before execution.

## Rule Statement

No AI agent is allowed to modify code unless the task has:

1. a written spec,
2. a reviewed plan,
3. explicit allowed files,
4. explicit disallowed files.

## Rationale

This reduces scope drift, prevents unrelated edits, and improves implementation review quality.

## Applies To

- all implementation tasks
- UI tasks
- refactor tasks
- data-related tasks
- admin tasks

## Evidence

This pattern has repeatedly reduced over-editing, hidden refactors, and vague execution prompts in small and medium tasks.

## Good Examples

- A navbar task defines only navbar component files and related style files as editable.
- A shared type extraction task explicitly lists only model files and dependent usage points.

## Bad Examples

- Asking AI to “clean up this page” without file scope.
- Starting Agent execution from a rough idea without a spec.
- Treating Plan output as implementation approval without review.

## Status

Active
