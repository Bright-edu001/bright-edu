# Workflow SOP

## Purpose

This SOP describes the standard operating procedure for AI-assisted task execution in Bright-Edu projects.

It is intended for day-to-day use when moving a task from idea to verified result.

---

## Workflow Overview

1. Task intake
2. Task triage
3. Spec drafting
4. Scope boundary definition
5. Plan generation
6. Human review
7. Agent execution
8. Verification and testing
9. Notion write-back
10. Learning / Rule follow-up

---

## Step 1. Task Intake

Create a task in Notion before implementation begins.

Required minimum fields:

- Task ID
- Task Name
- Project
- Type
- Priority
- Summary
- Goal
- Scope
- Non-goals

Do not start from a vague prompt only.

---

## Step 2. Task Triage

Determine:

- primary module
- task type
- risk level
- whether worktree is needed
- whether the task should be split

Primary module options:

- Frontend
- Admin
- Service
- Firebase
- Testing
- Docs

If the task touches multiple modules, split it unless there is a clear operational reason not to.

---

## Step 3. Spec Drafting

Create a spec before Plan or Agent execution.

The spec must contain:

- Summary
- Goal
- Scope
- Non-goals
- Affected Module
- Allowed Files
- Disallowed Files
- UI Impact
- Data / Security Impact
- Acceptance Criteria
- Test Cases
- Risks

---

## Step 4. Scope Boundary Definition

Define edit boundaries explicitly.

At minimum:

- Allowed Files
- Disallowed Files
- whether the task affects shared layers
- whether the task affects Firebase, rules, or functions
- required validation level

Do not proceed if the edit boundary is unclear.

---

## Step 5. Plan Generation

Use AI Plan mode to produce an implementation plan only.

The plan must include:

- intended file changes
- excluded files
- implementation steps
- risks
- validation method

Plan mode must not modify code.

---

## Step 6. Human Review

Review the plan before Agent execution.

Checklist:

- Is the scope still correct?
- Are file boundaries respected?
- Is shared-layer impact controlled?
- Is Firebase impact controlled?
- Is validation sufficient?
- Does the task need worktree isolation?

---

## Step 7. Agent Execution

Use Agent only after:

- spec is ready
- file boundaries are defined
- plan is reviewed

Agent instructions should always include:

- task goal
- allowed files
- disallowed files
- explicit non-goals
- validation requirement
- no scope expansion without approval

---

## Step 8. Verification and Testing

Validate according to task type.

Minimum baseline:

- UI / Content: visual check + smoke check
- Shared component: affected path verification
- Service / data flow: functional verification
- Firebase: emulator verification
- Admin / permission: role-path verification
- Routing: affected route verification

If tests fail, return the task to implementation instead of forcing completion.

---

## Step 9. Notion Write-Back

After verification:

- update task status
- fill implementation summary if needed
- record branch / worktree path if used
- record validation outcome
- note deployment check requirement if applicable

This write-back is manual by default.

---

## Step 10. Learning / Rule Follow-Up

After a task is complete:

- create a Learning if reusable insight was discovered
- create or update a Rule if the same pattern has been validated repeatedly

Use Learning for situation-based findings.
Use Rule for stable, repeatable operating guidance.

---

## Status Flow Guidance

Recommended task status flow:

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

Not every task must reach Deployed.
Documentation and workflow tasks may end at Learned or Approved.

---

## Stop Conditions

Do not continue directly into implementation when:

- the scope is unclear
- the spec is missing
- file boundaries are not defined
- the task mixes too many modules
- Firebase / shared-layer risk is not understood

In those cases, go back and refine the task first.
