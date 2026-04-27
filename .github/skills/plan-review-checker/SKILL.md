---
name: plan-review-checker
description: review a proposed engineering plan against the bright-edu workflow before implementation begins. use when a plan has already been produced and needs a go/no-go review for scope safety, file-boundary compliance, execution readiness, and validation sufficiency. trigger when the user asks to review a plan, check whether a task can proceed to agent or codex, detect scope drift, validate allowed and disallowed file boundaries, or decide whether a task should proceed, be blocked, or be redirected.
---

# Overview

This skill reviews a task plan before implementation.

It does not create the task spec.
It does not execute the implementation.

Its purpose is to decide whether a plan is safe, bounded, and ready to proceed.

## Workflow

1. read the task spec or task summary
2. read the proposed plan
3. compare the plan against:
   - scope
   - non-goals
   - allowed files
   - disallowed files
   - task type
   - validation expectations
4. identify plan risks, missing constraints, and scope drift
5. return one of:
   - approved for execution
   - approved with tighter constraints
   - not ready, revise plan
   - blocked or redirect to R&D

## Required behavior

- output in Traditional Chinese unless the user asked otherwise
- do not implement code
- do not rewrite the whole plan unless necessary
- focus on review judgment, not ideation
- explicitly classify the result
- always check:
  - whether the plan matches the task goal
  - whether the plan respects non-goals
  - whether file boundaries are safe
  - whether the task should proceed at all
  - whether validation is sufficient
- prefer bounded execution over ambitious completeness
- accept that a valid outcome may be:
  - approved
  - approved with tighter constraints
  - blocked
  - no-change recommended
  - redirect to R&D

## Expected inputs

This skill works best when the user provides:

- Task ID
- Task Name
- task spec or equivalent task summary
- proposed implementation plan
- allowed files
- disallowed files

If some of these are missing:

- review with what is available
- explicitly mark missing review inputs
- lower confidence when key boundaries are absent

## Review priorities

Prioritize these checks in order:

1. scope safety
2. file-boundary safety
3. behavior-change risk
4. validation sufficiency
5. implementation readiness

Do not prioritize elegance over safety.

## Output format

Produce outputs in this order:

1. `Review Decision`
2. `What Passed`
3. `What Needs Tightening`
4. `Risk Notes`
5. `Recommended Next Step`

Keep the output short enough to act on quickly.

## Decision rules

### Approve

Use when:

- the plan fits the task
- file boundaries are clear
- the implementation path is reasonable
- validation is sufficient

### Approve with tighter constraints

Use when:

- the plan is directionally correct
- but it still needs execution limits such as:
  - CSS-first
  - SCSS-only
  - no structure changes
  - do not move side effects
  - inspect-only files must not be modified

### Not ready, revise plan

Use when:

- the plan is missing key execution detail
- file boundaries are too vague
- validation is too weak
- implementation steps are too broad to execute safely

### Blocked or redirect to R&D

Use when:

- source of truth is unclear
- the plan depends on hidden or conflicting systems
- bounded implementation is not trustworthy
- the task is actually a discovery problem, not an execution problem

## Review references

Use:

- `references/review-checklist.md`
- `references/scope-red-flags.md`

## Boundary rules

Do not:

- approve cross-module expansion silently
- approve backend, Firebase, or shared-layer drift without explicit scope
- approve “cleanup” plans that are actually redesigns or refactors in disguise

Do:

- recommend smaller execution boundaries
- recommend no-change outcomes when appropriate
- recommend blocked or R&D outcomes when implementation is premature

## Final reminder

This skill is a gate before execution.

A good review outcome protects:

- repo stability
- workflow consistency
- human review quality
- future Hermes routing quality
