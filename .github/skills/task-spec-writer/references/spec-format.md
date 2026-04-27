# Bright-Edu Task Spec Format

Use this exact structure for repo task specs.

## Output file path pattern

`docs/ai-collab/specs/TASK-XXX-short-task-name.md`

Use lowercase hyphenated English for the file name after the task ID.

---

# Required structure

```md
# TASK-XXX｜[Task Title]

## Summary

[One-paragraph task summary]

## Goal

- [Goal 1]
- [Goal 2]

## Scope

- [In-scope item 1]
- [In-scope item 2]

## Non-goals

- [Out-of-scope item 1]
- [Out-of-scope item 2]

## Affected Module

- [Frontend / Admin / Service / Firebase / Testing / Docs]

## Allowed Files

- `[path]`
- `[path]`

## Reference-Only Files

- `[path]`
- `[path]`

## Disallowed Files

- `[path]`
- `[path]`

## UI Impact

- [If applicable]
- [If none, state none expected]

## Data / Security Impact

- [If applicable]
- [If none, state none expected]

## Acceptance Criteria

- [Criterion 1]
- [Criterion 2]

## Test Cases

- [Test 1]
- [Test 2]

## Risks

- [Risk 1]
- [Risk 2]

## Validation Level

- [Visual check / Smoke test / Behavior comparison / etc.]

## Worktree Recommendation

- [Required / Optional / Not needed]

## Plan Notes

- [Any planning note or boundary warning]
```
