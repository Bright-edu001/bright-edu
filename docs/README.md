# Bright-Edu Documentation Index

## Purpose

This directory contains repository documentation for Bright-Edu.

Current AI workflow policy lives in Notion current records. The repo keeps product usage manuals, technical references, executable setup notes, and minimal bootstrap pointers only.

## Documentation Boundary

Keep these documentation types in the repo:

- project usage manuals
- Firebase / API / Admin / Permission / Performance technical docs
- GitHub Actions / deploy / CI executable config references
- minimal AI bootstrap pointers

Do not use repo Markdown as the current source for:

- workflow application policy
- AI collaboration rules
- tool roles
- task routing rules
- write-back / review policy

Those belong in Notion current records.

## Technical References

Use the remaining docs in this directory for repository-specific setup, implementation notes, and operational references.

Current examples include:

- `docs/ADMIN_GUIDE.md`
- `docs/API_DOCUMENTATION.md`
- `docs/APP_CHECK_GUIDE.md`
- `docs/FIREBASE_AUTH_SETUP.md`
- `docs/FIRESTORE_SECURITY_RULES.md`
- `docs/FORM_PERFORMANCE_GUIDE.md`
- `docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`
- `docs/PERMISSION_MANAGEMENT_GUIDE.md`

## Workflow Source of Truth

For AI-assisted development:

1. Read current Notion task / rule / learning / R&D context.
2. Use repo code and validation results for implementation behavior.
3. Use `.github/copilot-instructions.md` only as a short local bootstrap pointer.
4. Follow Notion current records when workflow docs or tool output disagree.

## Task Outcomes

Not every task must produce code changes.

Valid outcomes include:

- Implemented
- Blocked
- Approved with No Code Change
- Redirected to R&D

## Quality Gate Baseline

Current baseline for local validation is documented in `README.md` under 「品質閘門基線（TASK-AUD-008A）」。

Scope summary:

- Required before task completion: `npm run lint`, `npm run test:run`, and `npm run build`.
- Lint status: currently passes with 1 non-blocking `react-hooks/exhaustive-deps` warning.
- Not yet introduced as gates: typecheck.
- Not part of regular PR quality gates: analyze and deploy scripts.
- Build warning triage notes are recorded as current-state references, not as resolved-by-default quality gates.
