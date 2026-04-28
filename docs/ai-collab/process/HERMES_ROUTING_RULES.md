# Hermes Routing Rules

## Purpose

This document defines how Hermes should classify and route tasks inside the Bright-Edu workflow.

Hermes is intended to become the single front-door coordinator for AI-assisted development, but it must route tasks according to workflow rules rather than tool preference.

---

## Routing Goal

Hermes should decide whether a task should:

- go to Copilot
- go to Codex
- stop as Blocked
- close as Approved with No Code Change
- be redirected to R&D

Hermes should not assume every task must result in implementation.

---

## Required Inputs Before Routing

Hermes should only perform reliable routing when the task includes:

- Task ID
- Task Name
- Type
- Goal
- Scope
- Non-goals
- Allowed Files
- Disallowed Files
- Affected Module
- Acceptance Criteria
- Risks

If these inputs are missing, Hermes should not route directly to implementation.
It should first request spec completion or send the task to planning support.

---

## Routing Rules

### Route to Copilot when:

- the task is ambiguous
- repository discovery is still needed
- planning is still needed
- product or UX judgment is involved
- iterative human-in-the-loop adjustment is expected
- the task may reasonably end as Blocked, R&D, or No Change
- the task involves review-heavy reasoning

### Route to Codex when:

- the task is already well-defined
- the plan is approved
- the file boundary is explicit
- the task is low-risk
- the task is technical rather than presentation-driven
- the work is bounded and behavior-preserving
- the task is a refactor, cleanup, or small code transformation

### Route to Blocked when:

- source of truth is unclear
- overlapping systems make bounded implementation unreliable
- repeated fixes are not converging
- the task depends on hidden or out-of-scope files
- safe implementation cannot be justified inside the current boundary

### Route to Approved with No Code Change when:

- the task is review-oriented
- current implementation is already acceptable
- further change is higher risk than value
- no clearly safe low-risk improvement is available

### Route to R&D when:

- the task is actually an investigation problem
- implementation is premature
- architecture or workflow discovery is required first
- a new research artifact would create more value than direct code changes

---

## Worktree Guidance

Hermes should recommend worktree usage when:

- multiple tasks are active in parallel
- multiple execution agents are involved
- the task spans multiple sessions
- the task touches risky or shared surfaces

Hermes should not require worktree for every task.

---

## Output Expectations

After routing, Hermes should return:

- recommended path
- reason for that path
- execution tool if applicable
- whether worktree is recommended
- whether the task should proceed, stop, or be redirected

Hermes should summarize decisions in workflow language, not tool-centric language.

---

## Operating Reminder

Hermes is a coordinator, not the source of truth.

It should route tasks based on:

- task clarity
- scope quality
- risk level
- reviewability
- outcome appropriateness

not based on which tool seems more powerful.

## Current Role Adjustment

Hermes is no longer the main human-facing entrypoint.
Codex is the single front-door coworker.
Hermes supports Codex by reading Notion and assisting routing / outcome decisions.
