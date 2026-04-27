# Scope Red Flags

Use this file to identify common signs that a plan is becoming unsafe or over-scoped.

---

## A. Vague file boundaries

Examples:

- “related files”
- “adjacent files”
- “supporting files if needed”
- “minor cleanup elsewhere”

Why risky:

- these phrases often hide silent scope expansion

Recommended response:

- request explicit file lists
- convert uncertain files to inspect-only
- tighten the plan before approval

---

## B. Refactor disguised as cleanup

Examples:

- “while touching this area, also simplify...”
- “light cleanup across related components”
- “minor structural improvements”

Why risky:

- cleanup tasks often become broader refactors

Recommended response:

- split the task
- constrain to smallest safe boundary
- mark broader work as follow-up or R&D

---

## C. Source-of-truth ambiguity

Examples:

- multiple layout systems affect one surface
- overlapping hook or side-effect responsibilities
- historical styles and current styles both appear active

Why risky:

- small changes will not converge reliably

Recommended response:

- block implementation
- redirect to R&D or source-of-truth investigation

---

## D. Shared-layer drift

Examples:

- local component task begins changing:
  - shared hooks
  - shared types
  - utilities
  - routing
  - services

Why risky:

- local tasks become cross-module quickly

Recommended response:

- stop and re-scope
- create a separate task if the shared-layer change is truly needed

---

## E. Behavior equivalence not proven

Examples:

- moving success/error messaging
- moving validation responsibility
- changing ownership of loading state
- changing condition rendering logic without before/after checks

Why risky:

- behavior may change even if UI looks similar

Recommended response:

- require explicit behavior-preservation reasoning
- add tighter implementation constraints
- prefer no-change conclusion if risk exceeds value

---

## F. Validation too weak

Examples:

- “looks fine”
- “should still work”
- no mention of smoke testing
- no mention of diff comparison

Why risky:

- implementation may pass superficially but break behavior

Recommended response:

- require stronger validation before approval
- do not approve with vague validation
