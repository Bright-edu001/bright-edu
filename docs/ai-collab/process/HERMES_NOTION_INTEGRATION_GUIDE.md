# Hermes Notion Integration Guide

## Purpose

This guide defines how Hermes should connect to and use Notion inside the Bright-Edu workflow.

Hermes may read Notion to understand tasks, rules, learnings, and R&D records.
Hermes must not become the source of truth by itself.

---

## Integration Principle

Start with read-only access.

Do not enable write-back until Hermes has proven that it can:

- read task fields correctly
- interpret workflow rules correctly
- classify outcomes correctly
- route tasks correctly
- summarize results accurately

---

## Notion Databases

Hermes should be able to read:

- Tasks
- Rules
- Learnings
- R&D

Optional later:

- Workflow home page
- Project dashboard
- Deployment records

---

## Required Read Capabilities

Hermes must be able to:

1. read a task by Task ID
2. query tasks by Status
3. read rules by Rule ID
4. list recent Learnings
5. list recent R&D entries

---

## Minimum Verification Tests

### Test 1: Read a task

Ask Hermes to read:

```text
TASK-001
```

Expected:

- full task summary
- status
- scope
- allowed/disallowed files
- spec doc
- learning log if present

---

### Test 2: Read a rule

Ask Hermes to read:

```text
RULE-001
```

Expected:

- full rule summary
- reusable workflow instruction

---

### Test 3: Read Learnings

Ask Hermes to list the latest 3 Learnings.

Expected:

- learning title
- source task
- summary
- status

---

### Test 4: Query blocked tasks

Ask Hermes to query:

```text
Status = Blocked
```

Expected:

- TASK-002 should appear if its Notion status is Blocked
- Hermes should explain why it was blocked

---

## Read-Only Prompt

```text
Please verify Bright-Edu Notion read access.

Return:
1. TASK-001 summary
2. RULE-001 summary
3. latest 3 Learnings
4. all Blocked tasks

Do not create, update, or delete Notion records.
This is read-only verification.
```

---

## Routing Dry Run

After read access works, Hermes should perform a routing dry run.

Use:

```text
TASK-001 to TASK-005
```

For each task, Hermes should return:

- recommended outcome
- recommended execution tool
- whether worktree is needed
- whether historical outcome was reasonable
- what Hermes would have done differently

---

## Write Access Policy

Write access should be introduced gradually.

### Phase 1: No write access

Hermes can only read.

### Phase 2: Draft task creation only

Hermes may create Draft tasks, but not update existing records.

### Phase 3: Limited task updates

Hermes may update:

- Status
- Review Note
- Learning Log

Only after human confirmation.

### Phase 4: Learning and R&D creation

Hermes may draft or create Learning / R&D records only after human confirmation.

---

## Fields Hermes May Eventually Write

### Tasks

- Status
- Summary
- Review Note
- Spec Doc
- Learning Log

### Learnings

- Log Title
- Source Task
- Summary
- What Happened
- Root Cause
- Fix
- Status

### R&D

- Name
- Summary
- Potential Benefit
- Cost / Risk
- Suggested Use
- Decision

---

## Fields Hermes Should Not Write Automatically

Hermes should not automatically write or change:

- Priority
- Owner
- Due Date
- Deployment Target
- Need Deploy Check
- Rules promoted from Learnings
- Any final approval status without human confirmation

---

## Operating Reminder

Hermes can assist with Notion.
Hermes does not replace human confirmation.

The correct flow is:

1. Hermes drafts
2. Human reviews
3. Hermes writes only when explicitly approved
