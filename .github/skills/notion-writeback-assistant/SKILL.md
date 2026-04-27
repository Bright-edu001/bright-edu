---
name: notion-writeback-assistant
description: draft bright-edu notion updates after task review, implementation, blocked outcomes, or no-change conclusions. use when a task result needs to be written back into notion as structured task fields, review notes, learning drafts, or rule-candidate suggestions. trigger when the user asks to prepare notion content, summarize a completed task for notion, write a review note, decide whether a learning should be recorded, or determine whether a rule candidate exists after a task outcome.
---

# Overview

This skill prepares Notion-ready workflow records after a task outcome is known.

It does not approve the task by itself.
It does not replace human review.

Its purpose is to turn a completed review or implementation outcome into structured Notion content.

## Workflow

1. identify the task outcome type
2. collect the relevant result inputs
3. draft the Notion task update
4. decide whether a Learning draft should be created
5. decide whether a Rule candidate should be suggested
6. clearly separate:
   - confirmed facts
   - human review findings
   - follow-up recommendations

## Required behavior

- output in Traditional Chinese unless the user asked otherwise
- always produce a Notion-ready task update when enough task information exists
- support all valid task outcomes:
  - Implemented
  - Blocked
  - Approved with No Code Change
  - Redirected to R&D
- do not invent modified files, validation results, or review decisions
- base the write-back on actual outcomes, not optimistic assumptions
- keep summaries practical and reviewable
- prefer exact task language over generic achievement wording

## Expected inputs

This skill works best when the user provides some combination of:

- Task ID
- Task Name
- task type
- current outcome
- modified files
- summary of changes
- validation performed
- human review result
- whether the task was reverted, blocked, or closed with no code change
- whether a Learning or Rule may be needed

If some of these are missing:

- draft what is supported by known facts
- clearly mark unknown items
- do not fake certainty

## Output format

Produce outputs in this order:

1. `Task Notion Update`
2. `Review Note`
3. `Learning Recommendation`
4. `Rule Recommendation`
5. `Follow-up Notes`

Only include sections that are supported by the available evidence.
If there is no good reason to recommend a Rule, say so explicitly.

## Outcome-aware behavior

### Implemented

When the task ended with implementation:

- summarize what changed
- record validation
- note what was intentionally unchanged
- recommend a Learning only if the task produced reusable workflow insight
- recommend a Rule candidate only if the pattern is stable enough

### Blocked

When the task was blocked:

- explain why bounded implementation could not proceed
- name the source-of-truth issue, hidden dependency, or scope problem
- suggest whether an R&D entry should be created

### Approved with No Code Change

When the task ended with review but no implementation:

- explain what was reviewed
- explain why no change was made
- state why maintaining the current implementation is the correct decision

### Redirected to R&D

When the task turned into investigation work:

- explain why implementation is premature
- identify the investigation question
- suggest the R&D direction

## Notion drafting rules

Always follow:

- `references/writeback-format.md`

Use:

- concise, direct field values
- practical review notes
- evidence-based summaries

Do not:

- overstate completion
- describe work that was merely proposed
- claim validation that did not happen

## Learning and Rule decisions

Use:

- `references/learning-vs-rule.md`

Prefer:

- Learning when the pattern is useful but still emerging
- Rule suggestion only when the pattern has repeated enough to justify standardization

Do not force a Learning or Rule for every task.

## Boundary rules

Do not:

- change task history
- convert blocked work into success language
- treat no-change outcomes as failed work
- recommend a Rule from a single weak example

Do:

- preserve the true task outcome
- keep the language aligned with workflow reality
- support future Hermes and Notion automation by using stable structure

## Final reminder

This skill standardizes write-back.
The human still confirms correctness before Notion becomes final.
