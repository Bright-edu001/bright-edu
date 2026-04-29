# Notion MCP Setup (Bright-Edu)

## Purpose

This file is a setup pointer for connecting local tools to Notion current records.

It does not define workflow policy.
Notion current records remain the source of truth.

## Recommended Path

Use Notion MCP / OAuth in the local IDE when you need to read current pages or prepare approved write-backs.

Use REST API only when you explicitly need scripted access for a separate automation path.

## What Not to Do

- Do not put tokens in the repo.
- Do not paste tokens into chat.
- Do not treat MCP setup as a workflow policy document.
- Do not use this file to define task routing or approval rules.

## Minimum Setup Checklist

1. Configure the Notion MCP server in the local environment.
2. Authorize the Notion connection.
3. Verify read access to the current workspace pages.
4. Verify that the relevant current records are visible.
5. Use draft-first write-back behavior for any future write action.

## Secret Handling

Keep tokens outside the repository.

Good places:

- local environment secrets
- OS secret store
- CI secrets when scripting is approved

Bad places:

- repo files
- markdown docs
- chat messages

## Reminder

This file is only about connectivity.
The current workflow policy lives in current Notion records and the repo bootstrap files.
