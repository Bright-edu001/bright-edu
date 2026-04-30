# .github Rule Architecture

This file explains how `.github` is layered in Bright-Edu.

The goal is to keep repo-local instructions short, non-overlapping, and aligned with current Notion records.

## Core Policy

- Notion current records are the workflow source of truth.
- Repository code and validation are the implementation source of truth.
- `.github/` files are repo-local execution / bootstrap guidance.
- Historical workflow language must not override current workflow policy.

## Layer Map

### Layer 1: Repo Bootstrap

- `.github/copilot-instructions.md` — top-level bootstrap pointer.

### Layer 2: Focused Instructions

- `.github/instructions/*.instructions.md` — short, specific execution guidance.

### Layer 3: Role / Agent Files

- `.github/agents/*.agent.md` — role-specific execution behavior.

### Layer 4: Safety Hooks

- `.github/hooks/*.json` — guardrails and reminders for risky actions.

## Rule Priority Inside `.github`

When several `.github` files touch the same topic:

1. `.github/copilot-instructions.md`
2. `.github/instructions/*.instructions.md`
3. `.github/agents/*.agent.md`
4. `.github/hooks/*.json`

More specific files may add detail, but they must not contradict the higher layer.

## Maintenance Rule

Keep one idea in one place.
If a rule repeats across layers, keep only the shortest useful reference in the lower layer.
If the current workflow changes, update the bootstrap layer first and then align downstream files.

## Reminder

`.github` is for execution support.
Notion is for workflow knowledge.
