# Bright-Edu Copilot Instructions

## Purpose

This repository uses AI-assisted development under a controlled workflow.

The objective is to keep implementation:

- scoped
- reviewable
- safe for shared layers and Firebase-related modules
- aligned with repo documentation and Notion records

AI should accelerate execution, not expand task scope.

---

## Primary Workflow Order

Use this execution order by default:

1. Create or confirm Task
2. Write or confirm Spec
3. Define Allowed Files / Disallowed Files
4. Run Plan
5. Review Plan
6. Run Agent
7. Verify and test
8. Write back to Notion
9. Record Learning or update Rule when applicable

Do not skip directly from rough intent to code modification.

---

## Required Task Inputs Before Planning or Implementation

Before planning or implementation, confirm the task has at least:

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

If these are missing or unclear, ask for clarification or direct the user to complete the task spec first.

---

## Documentation Source Priority

Use the following priority when interpreting workflow and task context:

1. repository code and current file structure
2. `docs/ai-collab/` workflow and rule documents
3. Notion task / rule / learning records
4. `.workflow/active/TASK-XXX/` fallback artifacts when Notion or workflow records are unavailable

Do not treat `.workflow/active/` as the primary workflow source if `docs/ai-collab/` and Notion are available.

---

## Repository Workflow References

Use these documents as the primary workflow references:

- `docs/ai-collab/process/AI_WORKFLOW_COMPANY.md`
- `docs/ai-collab/process/WORKFLOW_SOP.md`
- `docs/ai-collab/process/GIT_WORKTREE_SOP.md`
- `docs/ai-collab/rules/`
- `docs/ai-collab/notion/NOTION_FIELD_GUIDE.md`
- `docs/ai-collab/notion/TEMPLATES.md`
- `docs/ai-collab/notion/NOTION_WRITEBACK_SOP.md`

If there is ambiguity, prefer the more specific rule or instruction file over a general statement.

---

## Module Boundary Policy

By default, one task should have one primary module only.

Allowed primary modules:

- Frontend
- Admin
- Service
- Firebase
- Testing
- Docs

If a task crosses multiple modules, prefer splitting it into smaller tasks unless the user explicitly intends otherwise.

Do not expand a small task into a multi-module refactor without approval.

---

## File Scope Policy

Every implementation task must define edit boundaries.

### Required

- Allowed Files
- Disallowed Files

### Default behavior

- modify only files inside the allowed boundary
- do not “clean up” unrelated files
- do not widen scope because an adjacent improvement seems useful

If implementation appears to require out-of-scope changes, stop and surface the dependency instead of silently expanding the task.

---

## Plan Before Agent

Plan mode is required before Agent-style implementation.

Plan output should include:

- change summary
- files to modify
- files not to modify
- implementation steps
- risks
- validation approach

Plan mode must not be treated as implicit approval to implement.

Human review is still required before execution.

---

## UI Change Policy

For any UI-related task:

- define what visibly changes
- define which page or section is affected
- define what should not change

Do not turn a localized UI task into a redesign, layout rewrite, or style cleanup unless the task explicitly requests it.

If a UI change is not clearly described, request clarification before implementation.

---

## Firebase and Safety Policy

This repository uses Firebase-related infrastructure. Treat data and security changes conservatively.

### Rules

- emulator-first for Firebase-related validation
- do not test against production data
- do not modify `firestore.rules`, `storage.rules`, or `functions/` unless the spec explicitly includes them
- do not hardcode secrets or sensitive configuration
- do not bypass established service or data access layers without justification

If a task touches Firebase, auth, rules, or Cloud Functions, explicitly call out the affected boundary before proceeding.

---

## Shared Layer Change Policy

Changes to shared layers require extra caution.

Shared layers include:

- shared types
- shared services
- routing
- config
- permissions
- common utilities

Do not change shared layers as incidental cleanup.
Require explicit impact awareness before modifying them.

---

## Validation Expectations

Validation should match task type and risk.

Minimum expectations:

- UI / Content: visual verification + smoke check
- Shared component: affected path verification
- Service / Data: functional verification
- Firebase: emulator verification
- Admin / Permission: role-path verification
- Routing: affected route verification

Do not claim a task is complete without appropriate validation.

---

## Notion Write-Back Policy

Manual Notion write-back is the current default.

After implementation and verification:

- update task status
- record branch / worktree path if used
- record relevant outcome notes
- record learning follow-up if created

Follow:

- `docs/ai-collab/notion/NOTION_WRITEBACK_SOP.md`

---

## Worktree Policy

Use Git Worktree by default for:

- multi-task parallel work
- multi-agent execution
- long-running tasks
- risky or shared-surface work

For small, isolated tasks, worktree may be optional.

Follow:

- `docs/ai-collab/process/GIT_WORKTREE_SOP.md`
- `.github/instructions/worktree.instructions.md`

---

## Existing Repository Instructions

Keep following existing focused instructions under `.github/instructions/`, including areas such as:

- React components
- SCSS styling
- Firebase behavior
- Notion workflow integration

Use the most relevant specific instruction for the task at hand.

---

## Operating Bias

Default toward:

- smaller tasks
- explicit constraints
- reviewed plans
- safe boundaries
- manual knowledge capture before automation
