# Templates

This document provides copy-ready templates for Specs, Rules, Learnings, R&D entries, and Notion task entries.

---

# 1. Spec Template

```md
# TASK-XXX｜[Task Title]

## Summary

[One-paragraph summary of the task]

## Goal

- [Expected outcome 1]
- [Expected outcome 2]

## Scope

- [In-scope item 1]
- [In-scope item 2]

## Non-goals

- [Out-of-scope item 1]
- [Out-of-scope item 2]

## Affected Module

- [Frontend / Admin / Service / Firebase / Testing / Docs]

## Allowed Files

- `[path/to/file-or-directory]`
- `[path/to/file-or-directory]`

## Disallowed Files

- `[path/to/file-or-directory]`
- `[path/to/file-or-directory]`

## UI Impact

- [Does this affect UI?]
- [Which page or section is affected?]
- [What should not be changed?]

## Data / Security Impact

- [Does this affect Firebase / auth / rules / functions?]
- [If no, explicitly say none]
- [If yes, define the boundary]

## Acceptance Criteria

- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

## Test Cases

- [Test step 1]
- [Test step 2]
- [Test step 3]

## Risks

- [Risk 1]
- [Risk 2]

## Plan Notes

- [To be filled after planning if needed]
```

# RULE-XXX｜[Rule Title]

## Summary

[One-sentence summary]

## Rule Statement

[Write the rule as a directive]

## Rationale

[Why this rule exists]

## Applies To

- [Task type / module / situation 1]
- [Task type / module / situation 2]

## Evidence

- [Related Task]
- [Related Learning]

## Good Examples

- [Example of following the rule]

## Bad Examples

- [Example of violating the rule]

## Status

[Draft / Active / Deprecated]

# LEARNING-XXX｜[Learning Title]

## Summary

[One-sentence summary]

## Context

[Where this learning came from]

## Problem

[What issue appeared]

## Action

[What was done]

## Result

[What happened after the action]

## Reuse Suggestion

[How this should influence future work]

## Related Task

- [TASK-XXX]

## Candidate Rule

- [RULE-XXX or N/A]

# RD-XXX｜[Topic Title]

## Summary

[What is being explored]

## Category

- [Tooling / Workflow / Testing / Agent / Infra / Other]

## Potential Benefit

[Why this might be useful]

## Cost / Risk

[What it may cost or complicate]

## Suggested Use

[Where this may fit]

## Source

[Reference or source link]

## Source Type

[Internal / External / Experiment / Discussion]

## Related Rule

[RULE-XXX or N/A]

## Decision

[Explore / Validate Later / Pilot / Adopt / Reject / Archived]

## Status

[Draft / Reviewing / Validating / On Hold / Completed / Archived]

## Required

- Task Name:
- Task ID:
- Project:
- Type:
- Priority:
- Status:
- Summary:
- Goal:
- Scope:
- Non-goals:
- Acceptance Criteria:
- Test Cases:
- Risks:
- Repo:
- Spec Doc:
- Allowed Files:
- Disallowed Files:
- Affected Module:

## Recommended

- Related Rules:
- Worktree Needed:
- Branch:
- Worktree Path:
- Need Deploy Check:

## Optional

- Owner:
- Due Date:
- Deployment Target:
- Learning Log:
