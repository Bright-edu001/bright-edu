# Git Worktree SOP

## Purpose

This SOP defines when and how Git Worktree should be used in Bright-Edu projects.

Worktree isolation is used to reduce branch interference, protect task context, and support multi-task or multi-agent execution.

---

## Core Policy

- one task, one branch
- one active worktree, one task context
- parallel tasks should prefer worktree isolation
- multi-agent execution should use separate worktrees by default

Worktree is an isolation mechanism, not a substitute for spec or scope control.

---

## When Worktree Should Be Used

Use worktree by default when:

- multiple tasks are active in parallel
- multiple agents may work concurrently
- the task is long-running
- the task affects risky or shared areas
- context switching between branches would be frequent

---

## When Worktree May Be Skipped

A dedicated worktree may be unnecessary when:

- the task is a very small UI adjustment
- the task is a short text/content update
- the task is highly localized and low risk
- there is no parallel task switching

Even then, branch isolation still applies.

---

## Pre-Worktree Checklist

Before creating a worktree, confirm:

- Task exists
- Task ID exists
- spec exists or is at least in draft
- primary module is clear
- branch name is determined
- target path will not conflict with existing worktrees

---

## Naming Conventions

### Branch

Recommended patterns:

- `task/TASK-001-hero-refine`
- `task/TASK-002-navbar-rwd`
- `fix/TASK-010-anchor-offset`
- `refactor/TASK-015-shared-project-type`

### Worktree Path

Recommended patterns:

- `../wt-task-001-hero-refine`
- `../wt-task-002-navbar-rwd`
- `../wt-fix-task-010-anchor-offset`

The path should be readable and traceable back to the task.

---

## Notion Write-Back Requirements

If a worktree is used, the related Task should record:

- Branch
- Worktree Path
- Worktree Needed

This preserves operational traceability.

---

## Operational Rules

- one worktree should map to one clear task
- do not reuse a worktree for unrelated tasks
- remove finished worktrees when no longer needed
- do not use worktree as an excuse to skip spec, plan, or file scope control

---

## Recommended Decision Rule

Use this simplified rule:

### Use worktree when:

- parallel work exists
- multi-agent work exists
- the task is large enough to span multiple sessions

### Worktree optional when:

- the task is small
- the task is isolated
- the task is expected to finish quickly

---

## Closing a Worktree

After task completion:

- confirm changes are committed or otherwise preserved
- confirm branch is still needed
- remove unused worktree
- update Notion if path or branch changed during execution

---

## Caution

If task scope is unclear, do not solve the problem by opening more worktrees.
Fix the task definition first.
