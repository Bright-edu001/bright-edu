# .github Rule Architecture

This file explains how `.github` is layered in Bright-Edu.

The goal is to keep repo-local instructions short, non-overlapping, and aligned with current Notion records.

## Core Policy

- Notion current records are the workflow source of truth.
- Repository code and validation are the implementation source of truth.
- `.github` files are repo-local execution / bootstrap guidance.
- Historical workflow language must not override current workflow policy.

## Layer Map

### Layer 1: Repo Bootstrap

- `.github/copilot-instructions.md`

This is the top-level repo bootstrap pointer.
It should stay short and should not duplicate detailed instructions.

### Layer 2: Focused Instructions

- `.github/instructions/*.instructions.md`

These files contain short, specific execution guidance for a single concern.

Examples:

- Notion workflow bootstrap
- task execution
- worktree usage
- Firebase behavior
- React component conventions
- SCSS conventions

### Layer 3: Role / Agent Files

- `.github/agents/*.agent.md`

These files define role-specific execution behavior.

They should not restate the full repo bootstrap or duplicate all instruction content.

### Layer 4: Safety Hooks

- `.github/hooks/*.json`

These files provide guardrails and reminders before or after risky actions.

They should stay narrow and should not become policy documents.

## Rule Priority Inside `.github`

When several `.github` files touch the same topic:

1. `.github/copilot-instructions.md`
2. `.github/instructions/*.instructions.md`
3. `.github/agents/*.agent.md`
4. `.github/hooks/*.json`

More specific files may add detail, but they must not contradict the higher layer.

## Maintenance Rule

Keep one idea in one place.

If a rule is repeating in multiple layers, reduce duplication and keep only the shortest useful reference in the lower layer.

If the current workflow changes, update the bootstrap layer first and then align the downstream files.

## Reminder

`.github` is for execution support.
Notion is for workflow knowledge.
