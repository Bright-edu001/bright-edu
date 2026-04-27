# Bright-Edu Notion Write-Back Format

Use this structure when drafting Notion write-back content after a task outcome is known.

---

## 1. Task Notion Update

Draft the task fields using concise, factual language.

### Required fields to consider

- Task Name
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
- Affected Module
- Allowed Files
- Reference-Only Files
- Disallowed Files
- Validation Level
- Worktree Needed
- Related Rules
- Need Deploy Check
- Learning Log

### Optional fields

- Owner
- Branch
- Worktree Path
- Due Date
- Deployment Target
- Review Note

Use only known facts unless the workflow explicitly allows provisional values.

---

## 2. Status mapping by outcome

### Implemented and accepted

Typical status:

- Verified
  or
- Approved

### Implemented but still waiting human confirmation

Typical status:

- In Review
  or
- Human Review Required

### Blocked

Typical status:

- Blocked

### Approved with No Code Change

Typical status:

- Approved

### Redirected to R&D

Typical status:

- Blocked
  or
- task closed with R&D follow-up noted
  depending on team practice

Do not mark blocked work as verified.

---

## 3. Summary writing rule

The Summary should:

- describe what actually happened
- match the true outcome
- avoid exaggerated “success” language
- stay short and useful

### Good examples

- “Refactored repeated field rendering in ApplicationForm.jsx into a field configuration array while preserving behavior.”
- “Reviewed the boundary between ApplicationForm and useFormSubmit and concluded no safe low-risk improvement was justified.”
- “Attempted footer cleanup but stopped after discovering overlapping layout systems and unclear source of truth.”

---

## 4. Review Note writing rule

The Review Note should:

- explain the final review conclusion
- mention whether implementation stayed inside scope
- mention why the result was accepted, blocked, or closed with no change
- remain factual and operational

### Good examples

- “Implementation stayed within ApplicationForm.jsx only and preserved field order, placeholders, and submission behavior.”
- “Human review found overlapping layout systems, so implementation was reverted and the task was blocked pending source-of-truth investigation.”
- “Boundary review concluded current separation is already acceptable, so no code change was made.”

---

## 5. Learning Log handling

### When to include a Learning reference

Include a Learning log when:

- the task produced reusable workflow insight
- the conclusion is likely to help future tasks
- the lesson is more than a one-off observation

### When not to include one

Do not force a Learning when:

- the task was routine
- no reusable workflow insight emerged
- the lesson is too weak or too specific

---

## 6. Follow-up note rule

If a task should create follow-up work, note one of:

- R&D follow-up recommended
- separate refactor task recommended
- no follow-up needed

Keep follow-up suggestions bounded and specific.
