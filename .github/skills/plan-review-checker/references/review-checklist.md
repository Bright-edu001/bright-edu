# Bright-Edu Plan Review Checklist

Use this checklist when reviewing a proposed task plan.

---

## 1. Task alignment

Check:

- Does the plan clearly match the task goal?
- Does the plan stay inside scope?
- Does the plan respect non-goals?
- Is the intended outcome appropriate for the task type?

Red flag examples:

- plan introduces redesign for a cleanup task
- plan adds feature work inside a refactor task
- plan treats a review task as an implementation task

---

## 2. File-boundary safety

Check:

- Are files to modify explicitly listed?
- Are inspect-only files clearly separated?
- Are disallowed files respected?
- Is the real likely impact wider than the claimed file set?

Red flag examples:

- “may touch related files as needed”
- “might clean up adjacent styles”
- “may update shared utilities if needed”
- “will refactor data model if necessary”

---

## 3. Module safety

Check:

- Does the task stay in one primary module?
- If multiple modules are touched, is that explicitly intended?
- Is the plan accidentally expanding into shared layers, services, routing, or backend logic?

Red flag examples:

- frontend task starts changing service layer
- local refactor starts affecting shared hooks
- styling task starts touching layout system source of truth

---

## 4. Behavior risk

Check:

- Does the plan preserve required behavior?
- Does it accidentally change:
  - wording
  - field order
  - validation
  - submission
  - routing
  - side-effect ownership
- Are UI-only and logic changes being mixed unsafely?

Red flag examples:

- “move success/error handling” without proof of equivalence
- “simplify state” without behavior comparison
- “reorder fields for clarity” in a non-UX task

---

## 5. Validation sufficiency

Check:

- Is validation appropriate for task type?
- Are there clear before/after comparisons?
- Is there smoke testing when behavior must remain unchanged?
- Is visual verification included when visible output may change?

Typical validation patterns:

- UI task: Visual check + Smoke test
- Refactor: Behavior comparison + Smoke test
- Review task: Review-only conclusion may be valid
- Boundary review: No-change outcome may be valid

---

## 6. Outcome suitability

Check:

- Should this task proceed to implementation?
- Should it instead be:
  - approved with tighter constraints
  - blocked
  - approved with no code change
  - redirected to R&D

Do not assume implementation is mandatory.
