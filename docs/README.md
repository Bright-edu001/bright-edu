# Bright-Edu Documentation Index

## Purpose

This directory contains project documentation for the Bright-Edu repository.

The documentation is divided into two major categories:

1. Product / technical reference documentation
2. Repo-local bootstrap and historical workflow reference material

This README clarifies that current AI workflow policy lives in Notion current records.

---

## Documentation Source of Truth

For Bright-Edu AI-assisted development, the current workflow source of truth is Notion current records.

Repo documentation is bootstrap / execution reference material.
It should stay aligned with Notion, but it does not override current Notion records.

`docs/ai-collab/` is transitional repo-local workflow reference and historical material.
Do not treat `docs/ai-collab/` as canonical workflow policy.
Current workflow policy lives in Notion current records.

Historical documents under `docs/legacy/` remain historical context only.
They should not be treated as current workflow policy.

When there is conflict between older workflow documents and current Notion records, prefer Notion.
When repo-local bootstrap docs conflict with each other, prefer the most specific current file and update the mismatch later.

---

## Main Documentation Areas

### 1. `docs/ai-collab/`

This directory is transitional repo-local workflow reference and historical material.

Use this directory only when explicitly needed for:

- historical workflow context
- migrated task/spec references
- older rules or learning references
- Notion migration references
- tool adoption references that have not yet been minimized

Do not treat `docs/ai-collab/` as canonical workflow policy.
Current workflow policy lives in Notion current records.

Expected structure, if still present:

```text
docs/ai-collab/
  process/
  rules/
  notion/
  specs/
  learnings/
  research/
```

### 2. `docs/legacy/`

Use this directory for older workflow documents that are no longer the active source of truth.

Legacy documents may still be useful for historical context, but they should not override current Notion records or current repo bootstrap files.

If a legacy document contains useful content, migrate only the useful part into the current Notion workspace instead of continuing to treat the legacy file as current policy.

### 3. Product / Technical References

Use product and technical docs for repository-specific setup, implementation notes, and operational references.

Current examples include:

- `docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`
- `docs/NOTION_MCP_SETUP.md`

These files are reference material and do not override Notion current workflow records.

---

## Relationship Between `docs/` and `.github/`

### `docs/`

The `docs/` directory is the repository documentation and reference layer.

It can explain:

- project setup
- implementation notes
- technical references
- historical workflow context
- repo-local bootstrap references

It should not act as the current workflow policy source.

### `.github/`

The `.github/` directory is the execution-facing instruction layer.

It contains short bootstrap guidance and focused instruction files for local repository execution.

In short:

```text
Notion current records = workflow source of truth
docs/ai-collab/ = transitional repo-local workflow reference and historical material
.github/ = execution-facing bootstrap layer
```

---

## Current AI Workflow Pointer

Current Bright-Edu AI workflow is Notion-first and Codex-first.

The practical order is:

1. Read current Notion task / rule / learning / R&D context.
2. Confirm repository scope and file boundaries.
3. Use repo-local bootstrap docs for execution guidance.
4. Implement only inside approved boundaries.
5. Validate before closing.
6. Prepare draft Notion write-back if required.
7. Wait for approval before write-back.

---

## Task Outcome Model

Not every task must produce code changes.

Valid task outcomes include:

- Implemented
- Blocked
- Approved with No Code Change
- Redirected to R&D

If a linked repo-local task outcome guide still exists, it is reference material only and should not override Notion current records.
