# Design — TonMay Studio OS v1

## Architecture Overview
- **Frontend / Client Workspace:** React / Next.js app presenting TonMay Productions studio interface for Anton and client portal views for clients.
- **Backend & Database:** Supabase / PostgreSQL schema with enforced Row Level Security (RLS) on `organization_id`, `client_id`, `project_id`.
- **A2A Interface:** Agent discovery endpoint at `/.well-known/agent-card.json` exposing A2A 1.0 capabilities to upstream orchestrators like Hermes.
- **Integration Layer:** Adapters for Google Calendar, Apple `.ics`, Cash App, and Stripe (disabled by default).

## Design Principles
- **Steve Krug Simplicity:** Clear visual hierarchy, obvious next actions, no hidden state.
- **Production-Oriented Terminology:** Client, Shoot, Call Time, Shot List, Camera, Audio, Drone, B-roll, Selects, Revisions, Delivery.
- **Client Boundary:** Strict visual and data separation between internal collaborator (Macs Digital Media) notes and client-facing interfaces.
