# Task Execution Instructions

Use these instructions when planning or implementing a repository task.

## Purpose

Ensure that AI-assisted task execution follows a consistent, bounded, reviewable process.

This file applies to Plan and Agent-style execution.

---

## Minimum Required Task Context

Do not proceed directly into implementation unless the task has:

- Task ID
- Summary
- Goal
- Scope
- Non-goals
- Allowed Files
- Disallowed Files
- Affected Module
- Acceptance Criteria
- Test Cases

If these are missing, incomplete, or contradictory, stop and ask for clarification or spec completion first.

---

## Execution Phases

### Phase 1: Plan

Plan is required before implementation.

A valid Plan response should include:

- a concise implementation summary
- files that will be modified
- files that will not be modified
- step-by-step execution outline
- risks or dependencies
- validation method

Plan must not perform implementation.

If the task boundary is weak, use the planning step to tighten it.

---

### Phase 2: Review

Before implementation, the plan should be reviewed for:

- scope correctness
- file boundary correctness
- shared layer impact
- Firebase / rules / functions impact
- validation sufficiency
- whether worktree isolation is advisable

If review fails, refine the plan instead of implementing anyway.

---

### Phase 3: Agent Execution

Implementation is allowed only after:

- the spec exists
- the plan exists
- file boundaries are defined
- the user or reviewer has accepted the plan direction

During execution:

- stay inside allowed files
- respect disallowed files
- do not expand into unrelated cleanup
- do not perform speculative refactors
- do not widen module scope silently

If the requested change cannot be completed without extra files, surface that constraint explicitly.

---

## Module Scope Rule

Assume one primary module per task by default.

Primary modules:

- Frontend
- Admin
- Service
- Firebase
- Testing
- Docs

If the task crosses modules, recommend splitting it unless there is a clear reason not to.

---

## UI Task Rule

For UI-related work, require:

- visible change summary
- affected page or section
- explicit non-goals

Do not interpret vague requests like:

- “make it cleaner”
- “improve the UI”
- “refresh the layout”

without clarifying what should change.

---

## Firebase Task Rule

For Firebase-related work:

- define the affected boundary explicitly
- prefer emulator-first validation
- do not assume production-safe behavior without validation
- do not modify rules or Cloud Functions unless explicitly in scope

---

## Shared Layer Rule

Shared types, services, routes, config, permissions, and utilities are high-impact surfaces.

Do not modify them unless:

- they are explicitly in scope
- the impact is understood
- the change is necessary to complete the task correctly

---

## Completion Response Requirements

After implementation, report:

- modified files
- what was intentionally not changed
- validation performed
- unresolved risks or follow-up concerns
- whether a Learning or Rule follow-up may be appropriate

Do not present the task as “done” without stating the validation basis.

---

## Stop Conditions

Stop and ask for clarification if:

- the scope is too vague
- allowed/disallowed files are missing
- the task crosses too many modules
- the user intent and repo constraints conflict
- the requested change requires touching protected or high-risk files unexpectedly

---

## Alignment References

When executing tasks, align with:

- `docs/ai-collab/process/AI_WORKFLOW_COMPANY.md`
- `docs/ai-collab/process/WORKFLOW_SOP.md`
- `docs/ai-collab/rules/`
- `docs/ai-collab/notion/NOTION_WRITEBACK_SOP.md`
