# Skill Adoption Guide

## Purpose

This guide defines how project-level workflow skills should be introduced into the Bright-Edu repository.

The objective of Skills is not to add more prompts.
The objective is to reduce repeated manual workflow steps while preserving clear governance.

---

## Initial Skill Location

Project-level skills should initially live in:

`.github/skills/`

This keeps workflow skills aligned with the repository's existing instruction and automation layer.

Do not move to a global or tool-specific skill directory until the project-local versions are stable.

---

## First Batch of Skills

The first batch should focus on the most repetitive and structurally stable workflow steps:

1. `task-spec-writer`
2. `plan-review-checker`
3. `notion-writeback-assistant`

These three should be created before more advanced orchestration or execution skills.

---

## Skill Purposes

### task-spec-writer

Use to convert a task idea into:

- repo spec markdown
- Notion task draft
- standard scope, non-goals, acceptance criteria, test cases, and risks

### plan-review-checker

Use after a plan is produced to:

- detect scope drift
- detect boundary violations
- identify missing validation logic
- determine whether the task is safe to execute

### notion-writeback-assistant

Use after task review or completion to:

- draft Notion task updates
- draft review notes
- draft Learning entries
- recommend whether a Rule candidate exists

---

## Adoption Order

Adopt skills sequentially.

### Phase 1

Create:

- `task-spec-writer`

### Phase 2

Create:

- `plan-review-checker`

### Phase 3

Create:

- `notion-writeback-assistant`

Do not build all workflow skills at once if the output formats are still evolving.

---

## Relationship to Hermes

Skills should become reusable workflow modules that Hermes can call later.

That means:

- Skills define reusable workflow capability
- Hermes defines routing and orchestration
- Notion and repo docs remain the source of truth

Skills should not encode Hermes-specific behavior too early.
They must remain useful even before Hermes fully becomes the single front-door tool.

---

## Design Rule

Each skill should solve one workflow step only.

Do not create broad “do everything” skills.

Prefer:

- one skill for spec generation
- one skill for plan review
- one skill for write-back

This makes testing, maintenance, and reuse easier.

---

## Validation Rule

A new skill is only considered adopted when:

- it has a clear trigger
- it has a stable output format
- it reduces manual repetition
- it does not create source-of-truth confusion
- it can be reused across multiple tasks

---

## Operating Reminder

Workflow first, automation second.

Do not use Skills to compensate for unstable process design.
Use Skills to encode process only after the process has become repeatable.
