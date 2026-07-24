# Rollback Plan — TonMay Studio OS v1

## Rollback Triggers
- Security boundary violation (e.g. cross-tenant leak detected during testing).
- Unhandled critical error blocking main dashboard or client portal.
- Unapproved external data modification or deployment failure.

## Procedure
1. **Git Rollback:** Revert latest merge commit on working branch `git revert HEAD` or reset to previous verified SHA.
2. **Database Rollback:** Execute down-migration scripts for newly added tables/columns if additive schema changes were applied.
3. **Environment Safety:** Reset integration flags (`STRIPE_ENABLED=false`, `SMS_PROVIDER=dry_run`).
4. **Verification:** Rerun verification test suite to ensure clean baseline state is restored.
