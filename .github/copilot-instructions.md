# Bright-Edu Repo Bootstrap Instructions

## Purpose

This file is the repo-local bootstrap layer for AI-assisted execution.

It is not the workflow source of truth.
Notion current records are the workflow source of truth.
Repo code and validation results are the implementation source of truth.

Use this file to keep execution short, bounded, and consistent.

## Current Operating Model

- Notion is the workflow knowledge source of truth.
- Codex is the primary coworker and single task entrypoint.
- Codex native Notion connector is the primary workflow context path.
- Codex custom instructions provide high-level routing and safety bootstrap.
- Codex skills and plugins are the repeatable procedure layer.
- Hermes is QA / research / Notion write-back backup.
- Copilot and OpenClaw are historical or optional local tools, not workflow dependencies.
- Git worktree is an optional isolation tool, not the default workflow for every task.

## Execution Rules

- Keep tasks bounded.
- Respect approved file boundaries.
- Do not expand scope just because a nearby cleanup looks convenient.
- Do not treat repo docs as the source of current workflow policy.
- Do not assume implementation is required for every task.
- Use the most specific repo instruction file for the task type.

If scope is unclear, stop and ask for clarification or current Notion context.

## Task Gate

Before implementation, confirm:

- Task ID
- Goal
- Scope
- Non-goals
- Allowed files
- Disallowed files
- Acceptance criteria
- Validation expectations
- Whether worktree isolation is needed

If any of these are missing or contradictory, do not start implementation.

## Validation

Always validate before closing a task.

Choose validation that matches the change:

- UI / content: visual check plus smoke check
- Shared code: affected path verification
- Service / data: functional check
- Firebase: emulator-first validation
- Routing: affected route verification

Do not claim completion without validation.

## Notion Write-Back

Write-back is draft-first.

- Prepare the Notion write-back draft after verification.
- Wait for approval before writing.
- Keep write-back limited to the approved summary / status / outcome fields.
- Do not write code, secrets, or full diffs into Notion.

## Worktree

Use worktree only when the task benefits from isolation.

Examples:

- parallel tasks
- long-running changes
- risky shared-surface work
- explicit user request

Do not use worktree as a substitute for scope control.

## Reminder

This file is a bootstrap pointer, not a full workflow policy document.
Keep it short.
