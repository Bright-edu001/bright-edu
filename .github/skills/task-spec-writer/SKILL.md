---
name: task-spec-writer
description: generate a bounded engineering task spec and a matching notion task draft for the bright-edu workflow. use when a new implementation, review, refactor, cleanup, investigation, or optimization task needs to be formalized into the project standard format. trigger when the user asks to create a spec, open a new task, turn a task idea into a repo-ready spec, prepare notion task content, or convert rough task notes into structured workflow artifacts. always produce both the repo spec draft and the notion task draft together.
---

# Overview

This skill creates two outputs together for a single task:

1. a repo-ready task spec markdown file
2. a Notion task draft covering all task fields used in the Bright-Edu workflow

Use this skill only for creating or formalizing one task at a time.

Keep the outputs tool-agnostic so they remain usable with Copilot, Codex, Hermes, and future execution layers.

## Workflow

1. identify the task type and intended outcome
2. collect or infer the minimum task inputs
3. generate the repo spec draft
4. generate the Notion task draft
5. clearly mark any inferred, assumed, or still-unknown values
6. do not over-specify uncertain file boundaries

## Required behavior

- output in Traditional Chinese unless the user asked otherwise
- always produce both:
  - repo spec markdown
  - notion task draft
- always include:
  - scope
  - non-goals
  - acceptance criteria
  - test cases
  - risks
  - allowed files
  - disallowed files
  - affected module
- preserve the Bright-Edu workflow principles:
  - spec first
  - plan before agent
  - bounded file scope
  - small tasks before big refactors
  - manual review remains required
- do not assume every task is implementation-ready
- if the task is more appropriate as R&D or review-only work, still produce a bounded task draft but explicitly note that implementation readiness is low

## Input handling rules

When the user provides incomplete task information:

- fill low-risk metadata using reasonable defaults
- mark uncertain fields as one of:
  - `TBD`
  - `To be finalized after repository inspection`
  - `Optional`
- do not invent precise file paths unless there is concrete evidence
- do not invent backend, Firebase, or shared-layer scope without evidence
- do not silently widen module boundaries

## Task type defaults

### UI

Default validation:

- Visual check
- Smoke test

### Refactor

Default validation:

- Smoke test
- Behavior comparison before/after

### R&D-like implementation candidate

If implementation readiness is unclear:

- keep scope narrow
- explicitly note discovery risk
- suggest that plan or repo inspection may further refine allowed files

## Output format

Produce outputs in this order:

1. `Repo Spec Draft`
2. `Notion Task Draft`
3. `Assumptions / TBD Items`

Keep them easy to copy.

## Repo spec requirements

Follow the exact section structure from:

- `references/spec-format.md`

If file boundaries are unknown, use:

- `To be finalized after repository inspection`

If the task is clearly low-risk and local, you may draft likely file categories, but mark them as provisional unless confirmed.

## Notion task draft requirements

Follow the field structure from:

- `references/task-field-mapping.md`

Always include all current task fields used by the workflow, even when some values remain provisional.

## Boundary rules

Do not:

- create multi-module scope unless the user explicitly intends it
- assume backend changes
- assume Firebase changes
- assume shared abstraction changes
- assume worktree is required for every task

Do:

- prefer one primary module per task
- recommend small, bounded tasks
- keep outputs stable enough for future Hermes routing

## If the task is not implementation-ready

Still generate the task draft, but:

- mark allowed files as provisional
- mark implementation readiness risk explicitly
- indicate whether the task may become:
  - Blocked
  - Approved with No Code Change
  - Redirected to R&D

## Final reminder

This skill standardizes task definition.
It does not approve execution.
Plan review and human confirmation still happen later.
