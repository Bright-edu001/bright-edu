# Worktree Instructions

Use these instructions when deciding whether a task should use Git Worktree isolation.

## Purpose

Ensure that multi-task or multi-agent development remains isolated, traceable, and less error-prone.

Worktree is an execution isolation strategy, not a replacement for task definition or scope control.

---

## Use Worktree by Default When

Recommend or use Git Worktree when:

- multiple tasks are active in parallel
- multiple agents may work at the same time
- the task is expected to span multiple sessions
- branch switching would be frequent
- the task affects risky or shared areas
- the user explicitly wants isolated execution contexts

---

## Worktree May Be Optional When

A dedicated worktree may be unnecessary when:

- the task is small and localized
- the task is a short-lived UI or content adjustment
- the task is unlikely to overlap with other work
- no parallel task switching is expected

Even if worktree is skipped, branch isolation still applies.

---

## Pre-Worktree Checks

Before recommending or creating a worktree, confirm:

- Task exists
- Task ID exists
- scope is clear enough
- primary module is known
- branch naming is determined
- the worktree path will not conflict with existing directories

If the task itself is poorly defined, fix the task first instead of compensating with more worktrees.

---

## Naming Conventions

### Branch

Use readable names tied to the task ID.

Examples:

- `task/TASK-001-hero-refine`
- `task/TASK-002-navbar-rwd`
- `fix/TASK-010-anchor-offset`
- `refactor/TASK-015-shared-project-type`

### Worktree Path

Use readable paths tied to the task ID.

Examples:

- `../wt-task-001-hero-refine`
- `../wt-task-002-navbar-rwd`
- `../wt-fix-task-010-anchor-offset`

---

## Notion Write-Back

If worktree is used, the related task should record:

- Worktree Needed
- Branch
- Worktree Path

This keeps execution traceable across repo, local workspace, and Notion.

---

## Operational Rules

- one worktree should map to one clear task
- do not reuse the same worktree for unrelated tasks
- do not use worktree as an excuse to skip spec, plan, or file scope
- remove unused worktrees after task completion when appropriate

---

## Recommendation Heuristic

Use this simple decision rule:

### Recommend worktree when:

- parallel work exists
- multi-agent work exists
- the task is long-running
- the task touches higher-risk surfaces

### Worktree optional when:

- the task is small
- the task is isolated
- the task is expected to finish quickly

---

## Alignment References

Keep decisions aligned with:

- `docs/ai-collab/process/GIT_WORKTREE_SOP.md`
- `docs/ai-collab/process/WORKFLOW_SOP.md`
- `docs/ai-collab/notion/NOTION_FIELD_GUIDE.md`

---

## Caution

If a task is unclear, do not solve the problem by opening more branches or more worktrees.

Refine the task definition first.
