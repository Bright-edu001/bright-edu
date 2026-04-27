# Bright-Edu Workflow Skills

## Purpose

This directory stores project-level workflow skills for the Bright-Edu repository.

These skills are not general-purpose coding helpers.
They are reusable workflow modules that standardize recurring steps in the Bright-Edu AI collaboration process.

The goal is to reduce repeated manual prompting while preserving:

- clear source of truth
- bounded execution
- human review
- stable task governance

---

## Source of Truth

Skills do not replace the workflow source of truth.

The source of truth remains:

1. repository code
2. `docs/ai-collab/`
3. Notion task / rule / learning records

Skills are support modules that help generate, review, and write back workflow artifacts.

---

## Current Skill Set

### 1. `task-spec-writer`

Use when a new task needs to be formalized into:

- repo spec markdown
- Notion task draft

Typical use cases:

- turning a rough task idea into a bounded task spec
- creating a new task draft with scope, non-goals, acceptance criteria, and file boundaries
- preparing structured task input before planning

### 2. `plan-review-checker`

Use when a plan already exists and must be reviewed before execution.

Typical use cases:

- deciding whether a task is safe to proceed
- detecting scope drift
- tightening execution constraints
- deciding whether the correct outcome is:
  - approve
  - approve with tighter constraints
  - block
  - redirect to R&D

### 3. `notion-writeback-assistant`

Use when a task outcome is already known and needs to be written back into Notion.

Typical use cases:

- drafting task completion fields
- drafting review notes
- drafting Learning suggestions
- deciding whether a Rule candidate should be recommended

---

## Recommended Workflow Order

### Standard implementation workflow

Use the skills in this sequence:

1. `task-spec-writer`
2. `plan-review-checker`
3. execution by the appropriate tool or human
4. `notion-writeback-assistant`

This sequence mirrors the Bright-Edu workflow principle:

- spec first
- plan before execution
- bounded implementation
- human review
- write-back after confirmed outcome

---

## When Not to Use Skills

Do not use these skills as substitutes for:

- final human approval
- real repository inspection when file scope is unclear
- implementation execution
- product judgment
- source-of-truth decisions

If the task is still ambiguous, clarify the task first.
If the task is not implementation-ready, do not force the skill to pretend it is.

---

## Relationship to Execution Tools

These skills are workflow support modules.
They are not execution tools.

### Copilot

Best used for:

- Ask-style repository discovery
- planning
- review-heavy implementation
- tasks with product or UX judgment

### Codex

Best used for:

- bounded technical execution
- low-risk refactors
- behavior-preserving cleanup

### Hermes

Intended future role:

- workflow orchestration
- task routing
- deciding whether work should go to Copilot, Codex, Blocked, No Change, or R&D

Skills should remain useful even before Hermes becomes the single front-door workflow tool.

---

## Relationship to Hermes

Hermes may later call these skills as reusable workflow modules.

The intended long-term model is:

- Hermes receives the task
- Hermes selects the correct workflow step
- Hermes invokes the appropriate skill when needed
- Hermes routes execution to the right tool
- human confirms the result

For now, these skills should still be usable directly without Hermes.

---

## Skill Design Rules

Each skill in this directory should:

- solve one workflow step only
- have a clear trigger
- produce stable output
- avoid becoming a “do everything” instruction bundle
- remain tool-agnostic when possible
- support future Hermes routing without depending on it too early

---

## Current Adoption Priority

### Phase 1

Implemented:

- `task-spec-writer`
- `plan-review-checker`
- `notion-writeback-assistant`

### Future candidates

Consider later:

- `learning-rule-extractor`
- `bounded-implementation-guard`

Do not add more workflow skills unless a repeated manual step clearly justifies it.

---

## Maintenance Rule

Update these skills when:

- the workflow structure changes
- Notion field requirements change
- spec format changes
- task outcome rules change
- Hermes routing rules evolve enough to affect workflow expectations

Do not update them only because a single task had a one-off exception.

---

## Related Documents

- `docs/ai-collab/process/SKILL_ADOPTION_GUIDE.md`
- `docs/ai-collab/process/TOOL_EXECUTION_DECISION_GUIDE.md`
- `docs/ai-collab/process/HERMES_ROUTING_RULES.md`
- `docs/ai-collab/process/TASK_OUTCOME_DECISION_GUIDE.md`

---

## Operating Reminder

Workflow first, automation second.

Use skills to standardize repeatable workflow steps, not to bypass task definition, plan review, or human judgment.
