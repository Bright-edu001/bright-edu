# Bright-Edu Repo Bootstrap Instructions

## Purpose

This file is the minimal repo-local bootstrap pointer for AI-assisted execution.

Notion current records are the workflow source of truth. Repository code and validation results are the implementation source of truth.

## Current Operating Model

- Tools: Codex, Hermes, GPT Enterprise.
- Codex is the only task input window.
- Human only talks to Codex for task execution and workflow coordination.
- Codex coordinates code, tests, GitHub, and deploy preparation.
- Human performs final review and approval.
- Hermes supports QA, research, and Notion write-back backup.

## Execution Rules

- Read relevant Notion task / rule / learning / R&D context before implementation.
- Keep tasks bounded.
- Respect approved file boundaries.
- Do not expand scope silently.
- Do not treat repo docs as current workflow policy.
- Do not assume every task requires code changes.

If scope, allowed files, or acceptance criteria are unclear, stop and ask for clarification or current Notion context.

## Approval Gates

Wait for explicit human approval before:

- Notion write-back
- merge
- push
- deploy
- destructive Git
- broad cleanup
- out-of-scope file changes

## Validation

Use validation that matches the change and exists in the repo. Report skipped validation clearly.

## Reminder

Keep this file short. Current workflow policy belongs in Notion, not in repo Markdown.
