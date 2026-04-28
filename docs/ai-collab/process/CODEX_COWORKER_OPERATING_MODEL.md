# Codex Coworker Operating Model

## Purpose

This document defines the current Bright-Edu AI coworker operating model.

Codex is the single task entrypoint for company project work.
Hermes, Notion, repository docs, and project skills are supporting layers that Codex may use when needed.

---

## Core Principle

The human should not manually coordinate multiple AI tools for every task.

The preferred model is:

```text
Human -> Codex -> supporting tools/context -> Human confirmation
```

Codex is the primary coworker interface.
Hermes is a support tool, not the primary conversation window.

---

## Current Tool Set

### VSCode

VSCode is the development environment.

It is used for:

- editing
- reviewing diffs
- running local checks
- inspecting files

VSCode is not the workflow coordinator.

---

### Codex

Codex is the single front-door coworker.

Codex should:

- receive the task
- read the task spec
- read repository workflow documents
- use project skills when applicable
- decide whether Hermes context is needed
- execute bounded implementation when allowed
- stop when scope, source of truth, or risk is unclear
- return results for human confirmation

Codex should not:

- skip spec review
- modify disallowed files
- make Notion changes without approval
- promote Learnings into Rules without review
- assume every task requires code changes

---

### Hermes

Hermes is a supporting workflow and Notion context tool.

Hermes may be used by Codex to:

- read Notion Tasks
- read Rules
- read Learnings
- read R&D records
- perform routing or outcome reasoning
- prepare Notion write-back drafts

Hermes should not replace:

- repository workflow documentation
- task specs
- human confirmation
- Codex as the main task entrypoint

---

### Notion

Notion stores workflow records:

- Tasks
- Rules
- Learnings
- R&D

Notion is a workflow database, not an execution engine.

Write-back should remain human-confirmed until the workflow is stable.

---

## Source of Truth

The source of truth order is:

1. repository code
2. `docs/ai-collab/`
3. `.github/skills/`
4. Notion workflow databases
5. tool-generated summaries

If a tool-generated summary conflicts with repo docs or Notion records, verify before acting.

---

## Standard Codex Task Flow

### 1. Intake

Human gives Codex a task.

Codex should identify:

- Task ID
- task type
- goal
- allowed files
- disallowed files
- whether implementation is allowed
- whether Notion context is required

---

### 2. Context loading

Codex should load:

- relevant task spec
- workflow rules
- project skills
- relevant source files

Codex may use Hermes if Notion context is required.

---

### 3. Classification

Codex should classify the task as one of:

- implementation-ready
- plan-only
- review-only
- blocked
- no-change candidate
- R&D candidate

---

### 4. Plan

Before implementation, Codex must produce or confirm a plan.

The plan must include:

- intended changes
- files to modify
- files to inspect only
- files not to modify
- validation approach
- risks

---

### 5. Execution

Codex may execute only when:

- spec exists
- plan is approved or explicitly accepted
- allowed files are clear
- disallowed files are clear
- task is bounded
- implementation is permitted

Codex must not modify files outside the allowed scope.

---

### 6. Validation

Codex should report:

- modified files
- summary of actual changes
- validation performed
- intentionally unchanged items
- residual risks

Human performs final review.

---

### 7. Write-back draft

Codex may use `notion-writeback-assistant` and Hermes context to produce Notion-ready content.

Codex should not write final Notion updates unless explicitly approved.

---

## When Codex Should Use Hermes

Codex should use Hermes when:

- it needs to read Notion task records
- it needs to read Rules / Learnings / R&D
- it needs historical workflow context
- it needs Notion write-back drafting support
- it needs to verify task status or related records

Codex does not need Hermes when:

- the task spec is complete
- all context is already in repo
- the task is a small bounded implementation
- no Notion context is needed

---

## Valid Task Outcomes

Codex must support all valid Bright-Edu task outcomes:

- Implemented
- Blocked
- Approved with No Code Change
- Redirected to R&D

Codex should not force a code change just because a task exists.

---

## Copilot Exclusion

Copilot is not part of the company project workflow.

Reason:

- Copilot is tied to a personal account and quota
- company project work should avoid depending on personal Copilot usage
- Codex is the preferred single task entrypoint

Existing documents that mention Copilot should be treated as historical or adjusted to describe Codex-first operation.

---

## Operating Reminder

Codex is the coworker window.

Hermes is context and routing support.

Notion is the workflow database.

The human remains the final decision maker.

## Branch and Merge Policy

Codex may create a task branch from the current approved base branch.

For each implementation task:

- use one task branch
- perform implementation only on that task branch
- run available validation checks
- report results for human review

Codex must not merge back into the base branch until the human explicitly approves the merge.

Default base branch for current work:
`feature/test-preview`

Task branch naming pattern:
`task-XXX-short-task-name`
