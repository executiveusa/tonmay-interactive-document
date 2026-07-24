# Risk Register — TonMay Studio OS v1

| Risk | Severity | Mitigation Strategy |
|---|---|---|
| Cross-client data leakage | HIGH | Enforce strict RLS policies on `organization_id`, `client_id`, `project_id` and run automated cross-tenant security unit tests. |
| Production payments accidental charges | HIGH | Stripe disabled by default (`STRIPE_ENABLED=false`). Human approval required to activate live keys. |
| Destructive database migrations | HIGH | Additive migrations only with pre-execution DB backup verification. |
| PopeBot overwriting application files | HIGH | Scaffold PopeBot runtime strictly in an isolated subdirectory/worktree. |
| Live SMS/email spam during testing | MEDIUM | Default reminder channel provider to `dry_run` with delivery logging. |
| Unintended website auto-publishing | MEDIUM | Enforce PR-only workflow for `tonmay-productions` with explicit human review gates. |
| Raw video storage bloat in Supabase | MEDIUM | Store file metadata and cloud/disk pointers only; no direct raw high-res upload to DB. |
