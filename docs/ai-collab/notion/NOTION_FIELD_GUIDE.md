# Notion Field Guide

## Purpose

This document defines the expected field usage for the Bright-Edu AI collaboration workspace in Notion.

It covers:

- Tasks
- Rules
- Learnings
- R&D

---

# 1. Tasks Database

## Required Fields

The following fields should be treated as required for implementation tasks:

- Name
- Task ID
- Project
- Type
- Priority
- Status
- Summary
- Goal
- Scope
- Non-goals
- Acceptance Criteria
- Test Cases
- Risks
- Repo
- Spec Doc
- Allowed Files
- Disallowed Files
- Affected Module

## Recommended Fields

- Related Rules
- Worktree Needed
- Branch
- Worktree Path
- Need Deploy Check

## Optional Fields

- Owner
- Due Date
- Deployment Target
- Learning Log

## Suggested Select Values

### Type

- UI
- Content
- Refactor
- Bugfix
- Data
- Firebase
- Admin
- Testing
- Docs

### Priority

- P0
- P1
- P2
- P3

### Affected Module

- Frontend
- Admin
- Service
- Firebase
- Testing
- Docs

### Status

- Inbox
- Triaged
- Spec Draft
- Spec Ready
- Planning
- Ready for Agent
- In Progress
- In Review
- Test Failed
- Human Review Required
- Verified
- Approved
- Deployed
- Learned

### Validation Level

Recommended values if used:

- Visual check
- Smoke test
- Unit test
- E2E
- Emulator verification

---

# 2. Rules Database

## Required Fields

- Name
- Rule ID
- Project
- Rule Statement
- Rationale
- Applies To
- Status
- Source Task

## Recommended Fields

- Category
- Rule Type
- Trigger Source

## Optional Fields

- Confidence
- Created At
- Updated At

## Suggested Select Values

### Status

- Draft
- Active
- Deprecated

### Confidence

- Low
- Medium
- High
- Validated Repeatedly

---

# 3. Learnings Database

## Required Fields

- Name
- Learning ID
- Project
- Summary
- Context
- Problem
- Action
- Result
- Reuse Suggestion
- Source Task

## Recommended Fields

- Candidate Rule
- Type
- Status
- Root Cause

## Optional Fields

- Severity
- Created At

## Suggested Select Values

### Status

- Draft
- Active
- Archived

### Type

- Workflow
- UI
- Data
- Firebase
- Testing
- Architecture
- Collaboration

---

# 4. R&D Database

## Required Fields

- Name
- R&D ID
- Category
- Summary
- Priority
- Status
- Potential Benefit
- Cost / Risk
- Suggested Use

## Recommended Fields

- Related Project
- Source
- Source Type
- Related Rule
- Decision

## Optional Fields

- Owner
- Reviewed At

## Suggested Select Values

### Status

- Draft
- Reviewing
- Validating
- On Hold
- Completed
- Archived

### Decision

- Explore
- Validate Later
- Pilot
- Adopt
- Reject
- Archived

---

# 5. Operating Reminders

## Tasks

Do not move to Agent execution unless:

- Spec Doc exists
- Allowed Files exists
- Disallowed Files exists
- Scope is clear

## Rules

Only create a Rule when the practice is stable, repeatable, and useful across tasks.

## Learnings

Use Learnings for reusable findings discovered during actual execution.

## R&D

Use R&D for things still under evaluation. Do not treat R&D entries as official operating rules.
