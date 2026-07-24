# Tasks — TonMay Studio OS v1

## Phase 00 — Truth + Baseline
- [x] Verify target repository access and commit SHA.
- [x] Create OpenSpec specification files (`proposal.md`, `requirements.md`, `design.md`, `tasks.md`, `acceptance.md`, `risk-register.md`, `rollback.md`).
- [x] Inspect local handoff context bundle (`TONMAY_STUDIO_OS_COMPLETE_HANDOFF`).

## Phase 01 — Tenancy, RLS & Persistence
- [ ] Define database schema for organizations, clients, projects, sessions, shot lists, deliverables, payments, and audit logs.
- [ ] Implement row-level security (RLS) policies for multi-tenant data isolation.

## Phase 02 — Interactive Workspace & Client Portal
- [ ] Build Anton Studio OS dashboard (Today's shoots, incoming responses, payment statuses, active edits).
- [ ] Build client-facing portal (TonMay Productions branding, shot list reviews, deliverable downloads).

## Phase 03 — ASC3ND Real Client Seed
- [ ] Seed ASC3ND Collective "Community Cuts for Kids" project with production facts, shot list, and interview questions.

## Phase 04–12 — Advanced Modules
- [ ] Bookings, Reminders (48h/24h/same-day dry-runs), & Calendar (.ics export + Google adapter).
- [ ] Payment scaffolding (Cash App + disabled Stripe).
- [ ] Media & footage organization workflow.
- [ ] TonMay domain agent & A2A 1.0 Agent Card (`/.well-known/agent-card.json`).
- [ ] Browser QA & zero-context handoff.
