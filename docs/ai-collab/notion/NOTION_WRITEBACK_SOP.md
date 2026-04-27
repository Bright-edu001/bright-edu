# Notion Write-Back SOP

## Purpose

This SOP defines how task execution results should be written back into Notion after implementation and verification.

The current default is manual write-back.

---

## Why Manual Write-Back First

Manual write-back is the default because:

- the workflow is still being stabilized
- field usage is still being refined
- early automation may preserve weak structure or noisy records

Automation can be considered later after repeated stable use.

---

## When Write-Back Happens

Write-back should happen after:

- implementation is complete
- verification is complete
- task outcome is understood

Do not delay write-back too long after task completion.

---

## Task Write-Back Checklist

Update the task with:

- current Status
- final Summary if needed
- Branch
- Worktree Path
- whether deployment follow-up is needed
- verification result
- any important residual risk
- Learning reference if created

---

## Status Update Guidance

### Move to `Verified` when:

- implementation is complete
- validation passed
- remaining issues are understood and acceptable for the task boundary

### Move to `Approved` when:

- the task is accepted from a review standpoint

### Move to `Deployed` when:

- the change is actually deployed and that status matters for the task

### Move to `Learned` when:

- the task has been reflected into Learning and knowledge closure is complete

Not every task must end in `Deployed`.

---

## When to Create a Learning

Create a Learning when the task reveals:

- a reusable execution pattern
- a recurring mistake to avoid
- a useful implementation boundary
- a validation insight worth reusing
- a better way to scope or review future tasks

---

## When to Promote a Rule

Promote to Rule when:

- the practice is repeatable
- it applies beyond a single task
- it has proven useful more than once
- it should constrain future work consistently

Do not create Rules for one-off observations.

---

## Minimum Learning Write-Back

A useful Learning should include:

- what happened
- why it mattered
- what was done
- what should be reused next time

---

## Minimum Rule Write-Back

A useful Rule should include:

- the directive
- the reason
- where it applies
- what good and bad usage look like

---

## Operating Reminder

The objective of write-back is not record-keeping for its own sake.

The objective is to make future tasks:

- safer
- clearer
- faster to scope
- easier to review
