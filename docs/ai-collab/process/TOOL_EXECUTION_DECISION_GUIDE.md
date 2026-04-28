# Tool Execution Decision Guide

## Purpose

This guide defines how Bright-Edu tasks should be routed across human review, Copilot, Codex, and Hermes.

The objective is not to maximize automation.
The objective is to choose the correct execution path for each task while preserving:

- scope control
- reviewability
- workflow stability
- source-of-truth consistency

---

## Core Principle

Tools are execution layers, not governance layers.

The source of truth remains:

1. repository code
2. `docs/ai-collab/`
3. Notion task / rule / learning records

Tools may assist with planning, implementation, orchestration, or review, but they do not replace workflow rules.

---

## Roles

### Human

The human remains responsible for:

- task approval
- final scope decisions
- plan acceptance
- final validation judgment
- Notion correctness review
- Learning / Rule promotion decisions

### Copilot

Copilot is the default collaboration tool for:

- task exploration
- Ask-style repository inspection
- planning
- review-heavy implementation
- tasks with product or UX judgment
- iterative execution that benefits from back-and-forth adjustment

### Codex

Codex is a bounded execution tool for:

- low-risk implementation
- technical refactors with clear file scope
- patch-oriented tasks
- behavior-preserving cleanup
- small, well-defined code changes after planning is complete

Codex should not be the primary tool for ambiguous, exploratory, or product-judgment-heavy tasks.

### Hermes

Hermes is the orchestration and routing layer.

Hermes should be used to:

- receive structured tasks
- classify task type
- determine whether execution should proceed
- recommend worktree usage
- decide whether a task should go to Copilot, Codex, R&D, or no-change review
- consolidate execution outcomes for human confirmation

Hermes should not replace the workflow source of truth.

---

## Current Recommended Operating Model

### Current phase

Use this model now:

- Human defines and approves
- Copilot handles Ask / Plan / review support
- Copilot is the default execution tool
- Codex is used selectively as a bounded executor for suitable technical tasks
- Hermes is introduced gradually as a coordination layer, not yet as the only task entrypoint

### Practical rule

For now:

- start with Copilot
- use Codex only when the task is clearly bounded and technically suitable
- use Hermes experimentally for coordination, decomposition, and routing suggestions

Do not immediately route all tasks through Hermes until the orchestration model is stable.

---

## Future Recommended Operating Model

### After Hermes becomes stable

The long-term model can become:

1. Human creates or approves the task
2. Hermes receives the task
3. Hermes classifies the task
4. Hermes decides one of:
   - send to Copilot
   - send to Codex
   - recommend Blocked
   - recommend No Change
   - redirect to R&D
5. Human reviews the result
6. Notion and repo records are updated

This is the target coworker-style operating model.

---

## Decision Matrix

### Use Copilot when:

- the task is ambiguous
- the task needs Ask-style discovery
- planning is required
- the task involves product or UX judgment
- the task may require multiple discussion turns
- the task may end in review, R&D, or no-change
- implementation needs iterative correction

### Use Codex when:

- the task is already well-defined
- the plan is approved
- file scope is explicit
- the task is low-risk
- behavior should remain unchanged
- the task is technical rather than presentation-driven
- the task is a bounded refactor or cleanup

### Use Hermes when:

- task routing is needed
- multiple execution paths are possible
- task classification matters
- worktree or execution isolation recommendations are needed
- the workflow is mature enough to benefit from orchestration

### Use Human-only judgment when:

- source of truth is unclear
- product direction is unclear
- implementation would exceed scope
- the correct outcome may be Blocked or R&D rather than code change

---

## Operating Reminder

Do not ask:

- “Which tool is smartest?”

Ask:

- “Which tool is correct for this task stage?”

The right operating model is:

- stable rules
- bounded execution
- human final review
- tools selected by task type, not preference alone

## Current Company Tool Policy

Copilot is not used for Bright-Edu company project execution because it is tied to a personal account.

Codex is the primary coworker entrypoint.

Hermes is a supporting workflow and Notion context tool.
