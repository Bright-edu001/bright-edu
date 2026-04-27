# Learning vs Rule Decision Guide

Use this guide when deciding whether a task outcome should create:

- no extra artifact
- a Learning
- a Rule candidate

---

## Choose no extra artifact when:

- the task was routine
- the task produced no reusable insight
- the issue was too specific or too minor
- the conclusion does not help future workflow decisions

---

## Choose a Learning when:

- the task revealed a reusable workflow lesson
- the task exposed a recurring review pattern
- the task clarified when AI performs well or poorly
- the conclusion is useful, but not yet strong enough to standardize as a rule

### Common Learning examples

- brand-sensitive UI still needs human review
- no-change outcomes are valid for review tasks
- low-risk refactors work well when rendering contracts are frozen
- overlapping layout rules should trigger source-of-truth investigation before more cleanup

---

## Choose a Rule candidate when:

- the same pattern has repeated enough times
- the lesson is stable and operational
- future tasks should consistently follow the same rule
- the rule would reduce avoidable errors or scope drift

### Common Rule candidate examples

- all implementation tasks must define allowed and disallowed files
- all plans must be reviewed before execution
- source-of-truth ambiguity should block implementation

---

## Rule recommendation threshold

Recommend a Rule only when:

- the pattern is clearly repeatable
- the workflow benefit is strong
- the rule would be easy to apply consistently

If the pattern is still early, recommend a Learning instead.

---

## Output guidance

When recommending a Learning:

- explain the reusable insight
- connect it to the source task
- keep the conclusion practical

When recommending a Rule:

- describe the rule in operational language
- explain why it should become standard
- mention whether more validation may still be helpful

When recommending neither:

- say so directly
- do not force workflow artifacts where they are not justified
