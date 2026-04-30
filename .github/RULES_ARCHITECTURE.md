# .github Rule Architecture

This file explains the remaining `.github` documentation boundary for Bright-Edu.

## Core Policy

- Notion current records are the workflow source of truth.
- Repository code and validation results are the implementation source of truth.
- `.github/` is only a repo-local execution bootstrap layer.
- Workflow application, AI collaboration rules, task routing, review policy, and write-back policy belong in Notion.

## Current Layer Map

### Layer 1: Repo Bootstrap

- `.github/copilot-instructions.md` - top-level local bootstrap pointer.

### Layer 2: Focused Technical Instructions

- `.github/instructions/firebase.instructions.md` - Firebase-specific technical guidance.
- `.github/instructions/react-components.instructions.md` - React component technical guidance.
- `.github/instructions/scss-styles.instructions.md` - SCSS technical guidance.

Workflow routing, task execution policy, worktree policy, write-back policy, review policy, and AI collaboration rules live in Notion current records, not in repo instruction files.

### Layer 3: Automation / CI

- `.github/workflows/*` - executable GitHub Actions configuration.

## Maintenance Rule

Keep `.github` short and execution-facing.

If workflow policy changes, update Notion current records first. Repo bootstrap files should only point to that policy and should not restate it in full.

## Reminder

Codex is the task entrypoint. Notion is the workflow knowledge source of truth. The repo is for code, executable config, technical docs, and minimal bootstrap pointers.
