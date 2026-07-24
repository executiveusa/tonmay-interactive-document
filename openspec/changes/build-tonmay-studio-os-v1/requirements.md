# Requirements — TonMay Studio OS v1

## 1. User Roles & Identity
- **Anton (TonMay Owner):** Full access to dashboard, client management, footage controls, financial status, and studio assistant.
- **Macs Digital Media:** Internal collaborator with access only to explicitly shared projects.
- **Client Contacts:** Strictly isolated access to their own project workspace, questionnaires, shot-list approvals, deliverables, and revision requests.
- **Agent Service:** Scoped automation capabilities operating under harness permissions.

## 2. Security & Data Isolation
- Strict row-level isolation using `organization_id`, `client_id`, `project_id`.
- Zero cross-client memory or document leakage.
- Adversarial tests verifying Client A cannot access Client B resources.

## 3. Brand & Experience
- Client-facing portal branded strictly as **TonMay Productions**.
- Non-technical production terminology throughout Anton's UX.
- Steve Krug usability standards and responsive multi-breakpoint layout.

## 4. Production & Media Workflows
- Extensible service templates (People photography, Videography, Interviews, Documentary, Nonprofit/Community media, Drone).
- Hard drive + Cloud storage metadata organization (never auto-deleting raw originals).
- Pre-loaded first client seed: ASC3ND Collective - Community Cuts for Kids.

## 5. Bookings, Reminders & Payments
- Automated reminders at 48h, 24h, and same-day with Dry-Run / Test mode support.
- Calendar support: Google Calendar adapter + Apple `.ics` export.
- 25% deposit + remaining balance structure with configurable Cash App and disabled-by-default Stripe scaffold.

## 6. A2A & AI Agent Architecture
- Compliance with A2A 1.0 protocol standard (`/.well-known/agent-card.json`).
- Custom domain harness restricting agent actions (human approval required for high-risk operations).
