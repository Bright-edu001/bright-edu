# RULE-003｜Firebase-Related Work Must Be Emulator-First

## Summary

Tasks involving Firebase-related data flow, rules, or backend logic must be validated in emulator-based workflows before broader execution.

## Rule Statement

Any task affecting Firestore, Storage, Authentication, Cloud Functions, or related security rules must:

1. define the affected boundary in the spec,
2. avoid production testing,
3. use emulator-first validation where applicable.

## Rationale

Firebase-related changes can affect data integrity, permissions, and operational safety. Emulator-first validation reduces avoidable risk and prevents accidental production-side impact.

## Applies To

- Firestore-related tasks
- Cloud Functions tasks
- rules changes
- auth-related tasks
- storage-related tasks

## Evidence

This rule aligns with repository safety expectations and reduces the chance of unreviewed data-path or permission regressions.

## Good Examples

- Testing a document write flow in emulator before broader validation.
- Reviewing rules impact before touching `firestore.rules`.
- Keeping Firebase access changes within an existing service layer and validating safely.

## Bad Examples

- Testing write behavior directly against production data.
- Editing rules without impact documentation.
- Changing Firebase access patterns without spec coverage.

## Status

Active
