# AI Workflow for Bright-Edu Company Projects

## Purpose

This document defines the standard AI-assisted development workflow for Bright-Edu projects.

The goal is to ensure that AI is used within a controlled, reviewable, and reusable process rather than as an uncontrolled implementation shortcut.

This workflow is designed to:

- reduce scope drift
- improve implementation predictability
- protect shared layers and data-related modules
- keep project knowledge synchronized between repo docs and Notion

---

## Core Principles

1. Write the spec before asking AI to implement.
2. Always plan before agent execution.
3. Every task must define allowed and disallowed file scope.
4. Prefer small, reviewable tasks over broad refactors.
5. Replace placeholders gradually with real data.
6. Do not automate unstable processes too early.
7. Write back to Notion manually first; automate later if the workflow proves stable.
8. For parallel or multi-agent work, use Git Worktree isolation by default.

---

## Standard Execution Order

1. Create Task
2. Write Spec
3. Define constraints
4. Run Plan
5. Review Plan
6. Run Agent
7. Verify and test
8. Write back to Notion
9. Extract Learning and promote Rule if applicable

---

## Task Lifecycle

### 1. Create Task

Every implementation starts with a task entry in Notion.

Minimum task context:

- Task ID
- Summary
- Goal
- Scope
- Non-goals
- Project
- Type
- Priority

### 2. Write Spec

Before AI modifies code, a spec must exist.

A valid spec must define:

- Goal
- Scope
- Non-goals
- Affected module
- Allowed files
- Disallowed files
- Acceptance criteria
- Test cases
- Risks

### 3. Define Constraints

Before planning or implementation, explicitly define execution boundaries.

Required constraints:

- what may be edited
- what must not be edited
- whether UI is affected
- whether Firebase / rules / functions are affected
- required validation level

### 4. Run Plan

Use Plan mode to produce an implementation approach only.

The plan must include:

- files to modify
- files not to modify
- implementation steps
- risk notes
- validation approach

No code modification should happen during planning.

### 5. Review Plan

Human review is required before Agent execution.

Review focus:

- Is the scope still correct?
- Does the plan modify unrelated shared layers?
- Is there hidden refactoring?
- Does it affect routing, permissions, Firebase, or shared config?
- Is the validation approach sufficient?

### 6. Run Agent

Agent execution is allowed only after:

- spec exists
- plan is reviewed
- allowed/disallowed files are defined
- risks are understood

### 7. Verify and Test

Every task must be validated according to task type and risk.

### 8. Write Back to Notion

After verification, manually update the related Notion entries.

### 9. Extract Learning / Promote Rule

If the task reveals reusable practice, record a Learning.
If the same practice repeatedly proves effective, promote it into a Rule.

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

If a task crosses modules, split it into smaller tasks unless there is a clear reason not to.

---

## Validation Baseline by Task Type

### UI / Content

Minimum validation:

- local visual verification
- affected page smoke check

### Shared component change

Minimum validation:

- impacted page smoke check
- tests added or updated when risk is non-trivial

### Service / data flow

Minimum validation:

- local functional verification
- emulator verification when Firebase is involved

### Routing / navigation

Minimum validation:

- route-level verification
- language path verification if applicable

### Admin / permission

Minimum validation:

- affected role-path verification
- permission boundary check

### Firebase / Functions / Rules

Minimum validation:

- emulator-first
- impact analysis documented
- no production testing

---

## Repository-Specific Constraints

### UI Changes

For UI-related tasks:

- describe the intended visible change before implementation
- identify affected page(s) or section(s)
- define what will not be changed
- avoid unrelated cleanup or redesign

### Firebase / Data Changes

For Firebase-related tasks:

- emulator-first is mandatory
- do not test against production data
- do not modify rules or functions without explicit spec coverage
- do not bypass existing service/data access layers without justification

### Shared Layer Changes

Changes to shared types, services, routes, config, or permissions require explicit impact analysis in the spec.

### Cross-Module Changes

Do not treat cross-module work as default. Split first.

---

## Definition of Done

A task is done only when:

- the spec exists
- the implementation stayed within scope
- validation was completed
- Notion was updated
- relevant Learning / Rule follow-up was handled

---

## Preferred Documentation Locations

### Repo

- `docs/ai-collab/process/`
- `docs/ai-collab/rules/`
- `docs/ai-collab/notion/`
- `docs/ai-collab/specs/`
- `docs/ai-collab/learnings/`

### Notion

- Tasks
- Rules
- Learnings
- R&D

---

## Operating Bias

The default bias is:

- smaller scope
- explicit boundaries
- manual review before implementation
- manual knowledge write-back before automation
