# Task Outcome Decision Guide

## Purpose

This guide defines the allowed end states for AI-assisted development tasks in the Bright-Edu workflow.

Not every task should end as an implementation.
A valid task outcome may be:

- implemented
- blocked
- approved with no code change
- redirected to R&D

The purpose of this guide is to help decide when to continue, stop, re-scope, or close a task.

---

## Core Principle

A task is successful when it reaches the correct outcome, not when it merely produces code changes.

Do not force implementation if:

- the real problem is unclear
- source of truth is unclear
- risk is higher than likely value
- safe behavior-preserving change cannot be justified

---

## Outcome Types

### 1. Implemented

Use this outcome when:

- the task has a valid spec
- the plan is reviewed
- the implementation stays within allowed scope
- validation passes
- human review accepts the result

Typical status progression:

- In Progress
- In Review
- Verified
- Approved

---

### 2. Blocked

Use this outcome when:

- the task cannot proceed safely within the current scope
- source of truth is unclear
- multiple overlapping systems or rule layers make bounded implementation unreliable
- the real issue requires deeper investigation before implementation

Blocked does not mean failure.
It means implementation should stop until the problem is redefined.

Typical status:

- Blocked
- or Human Review Required with an explicit blocked note

---

### 3. Approved with No Code Change

Use this outcome when:

- the task was reviewed thoroughly
- a meaningful technical or workflow conclusion was reached
- no clearly safe, behavior-preserving improvement was found
- maintaining the current implementation is the best decision

This is a valid end state for review-oriented tasks.

Typical status:

- Approved

---

### 4. Redirected to R&D

Use this outcome when:

- the task reveals a design, architecture, or process question that should be investigated before implementation
- the work is not yet implementation-ready
- more discovery is needed to define a safe task

Typical status:

- R&D entry created
- original task closed, blocked, or re-scoped depending on context

---

## Decision Rules

### Choose Implemented when:

- scope is clear
- file boundaries are clear
- behavior changes are intentional and acceptable
- validation can prove success

### Choose Blocked when:

- source of truth is unclear
- bounded implementation is not trustworthy
- implementation would require silent scope expansion
- repeated small fixes are not converging

### Choose Approved with No Code Change when:

- review was the real task
- current implementation is acceptable
- potential changes are higher risk than benefit
- no safe low-risk improvement is justified

### Choose Redirected to R&D when:

- the task is actually a discovery problem
- implementation is premature
- a new investigation artifact would be more useful than more code attempts

---

## Mandatory Review Questions

Before closing any task, ask:

1. Is the problem definition actually clear?
2. Is the source of truth clear?
3. Can the task remain inside its approved file boundary?
4. Is there a safe and reviewable implementation path?
5. If no code change is made, is the conclusion still useful and valid?
6. Should this outcome create a Learning or R&D entry?

---

## Notion Write-Back Guidance

### If Implemented

Record:

- modified files
- validation result
- review note
- learning if applicable

### If Blocked

Record:

- why bounded implementation failed
- what source-of-truth issue or hidden dependency was found
- whether a new R&D item was created

### If Approved with No Code Change

Record:

- what was reviewed
- why no change was made
- why maintaining current behavior is the correct decision

### If Redirected to R&D

Record:

- what question needs investigation
- why implementation is premature
- the new R&D item that will carry the next step

---

## Operating Reminder

Do not optimize for “always making a code change.”

Optimize for:

- correct decision
- bounded execution
- reusable knowledge
- workflow stability
