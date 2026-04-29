# Worktree Instructions

Use this file when deciding whether Git worktree isolation is needed.

## Purpose

Git worktree is an optional isolation mechanism.

It helps with:

- parallel tasks
- long-running changes
- risky shared-surface work
- explicit human request

It is not the default for every task.

## When to Use Worktree

Recommend or use worktree when:

- multiple tasks are active in parallel
- multiple agents may work at the same time
- the task is expected to span multiple sessions
- branch switching would be frequent
- the task affects risky or shared areas
- the user explicitly wants isolated execution

## When Worktree Is Optional

A dedicated worktree may be unnecessary when:

- the task is small and localized
- the task is read-only or review-only
- the task is a short-lived content adjustment
- no parallel task switching is expected

Do not use worktree to compensate for unclear scope.

## Pre-checks

Before recommending worktree, confirm:

- task exists
- task ID exists
- scope is clear enough
- primary module is known
- branch naming is known
- the worktree path will not conflict with existing directories

If the task is vague, fix the task first.

## Naming Convention

Use the current branch naming convention:

```text
task-XXX-short-task-name
```

Examples:

- task-001-hero-refine
- task-002-navbar-rwd
- task-010-anchor-offset
- task-015-shared-project-type

Worktree path examples:

- ../wt-task-001-hero-refine
- ../wt-task-002-navbar-rwd
- ../wt-task-010-anchor-offset
- ../wt-task-015-shared-project-type

Do not use older slash-prefixed task branch conventions.

## Core Rule

Worktree should improve isolation, not replace scope control.

Use it only when it adds real value.
