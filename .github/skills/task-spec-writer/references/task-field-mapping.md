# Bright-Edu Notion Task Field Mapping

Use this field set when generating the Notion task draft.

Always output all fields, even if some values are provisional.

---

## Core fields

### Task Name

Format:
`TASK-XXX｜[Task Title]`

### Task ID

Format:
`TASK-XXX`

### Project

Usually:
`Bright-Edu`

### Type

Examples:

- UI
- Refactor
- Bug
- R&D
- Workflow

### Priority

Examples:

- P1
- P2
- P3

### Status

Default suggestions:

- Draft
- Spec Ready
- In Progress
- In Review
- Verified
- Approved
- Blocked

For a new task draft, default to:

- `Draft`
  or
- `Spec Ready`
  depending on how complete the task already is

### Summary

One concise paragraph.

### Goal

Concise outcome statement or short bullets.

### Scope

Clear in-scope work.

### Non-goals

Clear out-of-scope work.

### Acceptance Criteria

Observable completion conditions.

### Test Cases

Specific checks.

### Risks

Workflow or implementation risks.

### Repo

Usually:
`Bright-Edu`

### Spec Doc

Use the expected repo spec path.

### Affected Module

Examples:

- Frontend
- Admin
- Service
- Firebase
- Testing
- Docs

### Allowed Files

Exact or provisional file boundaries.

### Reference-Only Files

If applicable.

### Disallowed Files

Explicit boundaries.

### Validation Level

Examples:

- Visual check
- Smoke test
- Behavior comparison

### Worktree Needed

Examples:

- Required
- Optional
- No

### Related Rules

Use known rules when applicable.
Examples:

- RULE-001
- RULE-002

### Need Deploy Check

Examples:

- Yes
- No

---

## Optional fields

### Owner

Default:

- leave blank unless provided

### Branch

Default:

- leave blank unless already known

### Worktree Path

Default:

- leave blank unless already known

### Due Date

Default:

- leave blank unless provided

### Deployment Target

Default:

- leave blank unless applicable

### Learning Log

Default:

- leave blank for new task drafts

### Review Note

Default:

- leave blank for new task drafts unless implementation readiness concerns should be recorded

---

## Drafting rules

### If information is missing

Use one of:

- `TBD`
- `To be finalized after repository inspection`
- leave blank only for optional fields

### Allowed / Disallowed Files

Always include them.
Do not omit them.

### Reference-Only Files

Include when repo inspection or context files are likely needed.

### Status

Prefer:

- `Spec Ready` when the task is already fairly structured
- `Draft` when major uncertainty remains

### Worktree Needed

Prefer:

- `Optional` for most small tasks
- `No` when clearly unnecessary
- `Required` only when risk or parallelism clearly justifies it

### Related Rules

At minimum, consider:

- `RULE-001`
  Add others only when clearly relevant.
