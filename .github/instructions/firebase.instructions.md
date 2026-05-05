---
description: "Firebase technical guidance for config, services, Functions, Firestore, Storage, Auth, and environment handling."
applyTo: "src/config/**,src/services/**,functions/**"
---

# Firebase Technical Instructions

Keep Firebase changes small, explicit, and aligned with the existing client and Functions structure.

## Scope

Use this guidance for Firebase initialization, client services, Cloud Functions calls, Firestore, Storage, Auth, App Check, analytics, and environment handling.

## Configuration

- Keep Firebase app initialization in `src/config/` and service-specific wrappers in the existing config or service modules.
- Read environment values through the existing environment utilities when available.
- Treat every client-exposed variable as public configuration. Never add secrets, service account keys, private tokens, or admin credentials to client code or committed files.
- Preserve emulator-aware behavior when touching local development or Firestore connection logic.

## Client Services

- Keep Firestore, Storage, Auth, Functions, App Check, and Analytics imports close to the modules that configure or use them.
- Prefer small service functions with clear input validation and predictable return values.
- Do not create new global Firebase instances when an existing configured instance can be reused.
- Keep logging and error handling consistent with the surrounding service code.

## Firestore And Storage

- Validate IDs, slugs, paths, and required fields before writes.
- Keep collection and document paths explicit and easy to audit.
- Avoid broad reads or writes when a narrower query or document update is sufficient.
- Do not bypass security rules in client code. Client code must assume rules are enforced server-side.

## Cloud Functions

- Match the existing callable or HTTPS function style in `functions/` before adding new patterns.
- Validate request data and auth state at the function boundary.
- Return structured results and avoid leaking implementation details in client-visible errors.
- Keep Node runtime assumptions consistent with the existing Functions setup.

## Review Checklist

- No secrets or private credentials are introduced.
- Existing Firebase initialization and emulator behavior remain intact.
- Firestore, Storage, Auth, and Functions changes are scoped to the requested behavior.
- Error handling and logging match nearby code.
