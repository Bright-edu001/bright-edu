# Bright-Edu Documentation Index

## Purpose

This directory contains project documentation for the Bright-Edu repository.

The documentation is divided into two major categories:

1. AI collaboration workflow documentation
2. Product / technical reference documentation

The purpose of this README is to clarify which documents are considered the current source of truth and which documents are historical or supporting references.

---

## Documentation Source of Truth

For AI-assisted development workflow, the current source of truth is:

```text
docs/ai-collab/
```

This directory contains the active workflow rules, process guides, task specs, Notion conventions, learnings, and R&D records used by the Bright-Edu AI collaboration process.

When there is conflict between older workflow documents and `docs/ai-collab/`, prefer `docs/ai-collab/`.

---

## Main Documentation Areas

### 1. `docs/ai-collab/`

This is the active workflow governance layer.

Use this directory for:

- AI development workflow SOPs
- task specs
- rules
- Notion field guides and templates
- learnings
- R&D notes
- tool execution decisions
- Hermes routing rules
- skill adoption rules

Expected structure:

```text
docs/ai-collab/
  process/
  rules/
  notion/
  specs/
  learnings/
  research/
```

---

### 2. `docs/ai-collab/process/`

Use this directory for workflow-level process documentation.

Examples:

```text
AI_WORKFLOW_COMPANY.md
WORKFLOW_SOP.md
GIT_WORKTREE_SOP.md
TASK_OUTCOME_DECISION_GUIDE.md
TOOL_EXECUTION_DECISION_GUIDE.md
HERMES_ROUTING_RULES.md
SKILL_ADOPTION_GUIDE.md
```

These documents define how AI-assisted tasks should be created, routed, executed, reviewed, and closed.

---

### 3. `docs/ai-collab/specs/`

Use this directory for task-specific specs.

Each implementation or review task should have one spec file.

Naming pattern:

```text
TASK-XXX-short-task-name.md
```

Example:

```text
TASK-004-applicationform-logic-and-structure-cleanup.md
```

Task specs should define:

- Summary
- Goal
- Scope
- Non-goals
- Allowed Files
- Reference-Only Files
- Disallowed Files
- Acceptance Criteria
- Test Cases
- Risks
- Validation Level
- Worktree Recommendation

---

### 4. `docs/ai-collab/rules/`

Use this directory for validated workflow rules.

Rules should be stable, operational, and reusable across future tasks.

Do not promote a Learning to a Rule too early.

A Rule should usually come from repeated observations, not a single task.

---

### 5. `docs/ai-collab/learnings/`

Use this directory for workflow learnings discovered during task execution.

A Learning is appropriate when a task reveals a reusable insight, but the pattern is not yet strong enough to become a Rule.

Examples:

- brand-sensitive UI still needs human review
- overlapping layout rules should trigger source-of-truth investigation
- no-change outcomes can be valid task results
- low-risk refactors work well when rendering contracts are frozen

---

### 6. `docs/ai-collab/notion/`

Use this directory for Notion-related workflow references.

Examples:

```text
NOTION_FIELD_GUIDE.md
TEMPLATES.md
NOTION_WRITEBACK_SOP.md
```

These documents define how Tasks, Rules, Learnings, and R&D records should be structured and written back.

---

### 7. `docs/ai-collab/research/`

Use this directory for R&D documents.

R&D should be used when implementation is premature and further investigation is needed.

Examples:

- Hermes adoption planning
- Codex integration planning
- footer layout source-of-truth investigation
- skill candidate review

---

### 8. `docs/legacy/`

Use this directory for older workflow documents that are no longer the active source of truth.

Legacy documents may still be useful for historical context, but they should not override the current workflow defined under:

```text
docs/ai-collab/
```

If a legacy document contains useful content, migrate the relevant parts into the current `docs/ai-collab/` structure instead of continuing to update the legacy version.

---

## Relationship Between `docs/` and `.github/`

### `docs/`

The `docs/` directory is the governance and documentation layer.

It explains:

- what the workflow is
- why the workflow exists
- how tasks should be handled
- how decisions are recorded
- how tools should be selected

### `.github/`

The `.github/` directory is the execution-facing instruction layer.

It contains instructions and skills that tools such as Copilot, Codex, Hermes, or other agents may use when operating inside the repository.

In short:

```text
docs/ai-collab/ = workflow governance
.github/ = tool-facing execution instructions
```

If the two conflict, update them so they match. Do not allow the same rule to drift in two different forms.

---

## Current AI Workflow Principle

The current Bright-Edu AI workflow follows these principles:

1. Write the spec first
2. Plan before execution
3. Restrict allowed and disallowed files
4. Prefer small bounded tasks
5. Avoid premature automation
6. Validate before closing
7. Write back outcomes to Notion
8. Record Learnings and Rules only when justified
9. Use Hermes, Copilot, and Codex according to task type and maturity
10. Keep the human as final reviewer

---

## Task Outcome Model

Not every task must produce code changes.

Valid task outcomes include:

- Implemented
- Blocked
- Approved with No Code Change
- Redirected to R&D

See:

```text
docs/ai-collab/process/TASK_OUTCOME_DECISION_GUIDE.md
```

---

## Tool Routing Model

Tool selection should depend on task stage and risk level.

Current model:

- Copilot: default collaboration, Ask, Plan, review-heavy tasks
- Codex: bounded technical implementation
- Hermes: future orchestration and routing layer
- Human: final decision and validation authority

See:

```text
docs/ai-collab/process/TOOL_EXECUTION_DECISION_GUIDE.md
docs/ai-collab/process/HERMES_ROUTING_RULES.md
```

---

## Skill Adoption

Project-level workflow skills live in:

```text
.github/skills/
```

Current first-batch skills:

- task-spec-writer
- plan-review-checker
- notion-writeback-assistant

See:

```text
docs/ai-collab/process/SKILL_ADOPTION_GUIDE.md
.github/skills/README.md
```

---

## Maintenance Rules

When updating documentation:

1. Update the active source-of-truth document first
2. Avoid duplicating rules across multiple files without clear purpose
3. Move outdated workflow documents to `docs/legacy/`
4. Keep task specs under `docs/ai-collab/specs/`
5. Keep Learnings separate from Rules
6. Do not promote a Learning to a Rule without enough evidence
7. Keep `.github/` execution instructions aligned with `docs/ai-collab/`

---

## Operating Reminder

Documentation should reduce ambiguity.

If a document creates uncertainty about which workflow rule is current, update the documentation structure before adding more automation.

## Current Invocation Model

Skills are primarily used by Codex.

Hermes may read or support these skills, but Codex is the main task entrypoint.
