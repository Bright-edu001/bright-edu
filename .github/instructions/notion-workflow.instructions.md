---
description: "Notion workflow bootstrap for Bright-Edu. Use when reading current task context, checking write-back boundaries, or preparing a draft write-back."
applyTo: ".github/agents/*,docs/NOTION.md,.workflow/**"
---

# Notion Workflow Bootstrap

> This file is a repo-local bootstrap guide.
> Notion current records are the workflow source of truth.

## When to Use Notion

Use Notion for:

- current task context
- status and owner
- scope and non-goals
- acceptance criteria
- decision notes
- learning / R&D context
- approved write-back summaries

Notion is for current workflow knowledge, not for code storage.

## What to Write to Notion

Write only the useful workflow summary:

- one-line task summary
- status
- scope summary
- validation summary
- decision summary
- learning follow-up when justified

## What Not to Write to Notion

Do not write:

- source code
- full diffs
- secrets or tokens
- low-level raw logs
- verbose execution transcripts

## Write-Back Rule

Write-back is draft-first.

1. Prepare the draft.
2. Verify it matches the approved scope.
3. Wait for approval.
4. Write only the approved fields / blocks.

## Temporary Fallback

If the relevant Notion surface is unavailable, keep the minimum temporary task context in the repo-local fallback only as long as needed for continuity.

Do not treat the fallback as the source of truth.

Backfill current Notion records once access returns.

## Core Reminder

- Notion = workflow source of truth.
- Repo = execution surface.
- Draft first, then approval, then write-back.
