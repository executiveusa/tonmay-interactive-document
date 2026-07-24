# TonMay Studio OS v1 — Owner Runbook

## Overview
TonMay Studio OS v1 is the operating workspace for Anton / TonMay Productions. It manages clients, projects, bookings, shot lists, interview guides, payment tracking, footage organization, and website updates.

## Quick Start
1. **Launch Studio OS:** Run `npm run dev` in `tonmay-interactive-document`.
2. **Role View Switcher:** Top bar allows switching between Anton (Studio Owner), Macs Digital Media (Internal Collaborator), and ASC3ND Collective (Client Portal).

## Key Features & Safety Guards
- **Client Portal Isolation:** Clients see only their own projects. Macs internal collaboration notes are strictly hidden from clients.
- **Deposit & Cash App:** Default 25% deposit tracking with Cash App `$tonmayprod`. Stripe integration scaffold is present but disabled (`STRIPE_ENABLED=false`).
- **Reminders Engine:** 48h, 24h, and same-day notifications run in **dry-run mode** to prevent accidental live SMS/Email during testing.
- **Footage Rule:** Standardized folder plan (`01_ADMIN` to `09_ARCHIVE`). *Never delete original camera cards.*
- **Website Updates:** Draft portfolio PR proposals for `tonmay-productions`. Publishing remains human-gated (Jeremy/Bambú review).

## Verification Commands
- `npm test` — Run automated security, RLS, and deposit calculation tests.
- `npm run build` — Build production distribution bundle.
