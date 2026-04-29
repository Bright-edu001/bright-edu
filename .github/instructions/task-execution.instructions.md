# Task Execution Instructions

Use this file when a task is already approved for repo work.

## Purpose

Keep implementation bounded, reviewable, and aligned with the current task context.

This file does not define workflow policy.
It is a repo-local execution bootstrap.

## Minimum Context Before Execution

Confirm:

- Task ID
- Goal
- Scope
- Non-goals
- Allowed files
- Disallowed files
- Acceptance criteria
- Validation expectations
- Whether worktree is needed

If the task is unclear, stop and resolve the ambiguity before implementation.

## Execution Flow

1. Confirm current context.

   Read the current task context and any relevant repo-local reference docs before changing files.

2. Confirm boundaries.

   Do not touch files outside the approved scope.

3. Implement.

   Make the smallest correct change.

4. Validate.

   Run the relevant checks and confirm the result.

5. Prepare write-back draft.

   Summarize the outcome for Notion if the task requires it.

6. Wait for approval before write-back.

   Do not write back until approval is granted.

## Boundary Rules

- Stay inside allowed files.
- Do not clean up unrelated files.
- Do not widen scope silently.
- Do not refactor just because the code looks old.
- Stop if the task requires extra files that were not approved.

If extra changes are required, surface that dependency instead of improvising.

## Shared Layer Rule

Treat shared layers carefully.

Examples:

- shared types
- shared services
- routing
- config
- permissions
- common utilities

If a task touches shared layers, explicitly call out the impact before proceeding.

## Validation Rule

Always report:

- modified files
- what was intentionally not changed
- validation performed
- residual risks
- follow-up items if any

Do not call a task done without a validation basis.

## Reminder

This is a short execution pointer.
Use current Notion records and the most specific repo instruction file as needed.
