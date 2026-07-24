import React from 'react';
import { Bot, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface A2AAgentCardModalProps {
  onClose: () => void;
}

export const A2AAgentCardModal: React.FC<A2AAgentCardModalProps> = ({ onClose }) => {
  const agentCardJson = {
    "name": "TonMay Studio Agent",
    "description": "Domain-specific AI studio assistant for TonMay Productions managing client workbooks, session briefings, shot lists, reminders, and media workflows.",
    "version": "1.0",
    "protocol": "A2A-1.0",
    "url": "https://tonmay-interactive-document.vercel.app/.well-known/agent-card.json",
    "skills": [
      { "id": "client_management", "name": "Client & Project Workspace Management" },
      { "id": "booking_management", "name": "Session Booking & Scheduling" },
      { "id": "production_briefing", "name": "Creative & Production Briefing" },
      { "id": "shot_list_planning", "name": "Shot List & Interview Guide Generation" },
      { "id": "client_communications", "name": "Client Response & Update Drafting" },
      { "id": "reminder_management", "name": "48h/24h/Same-day Reminder Engine" },
      { "id": "media_organization", "name": "Footage Directory & Proxy Planning" },
      { "id": "payment_tracking", "name": "Deposit & Balance Tracking" },
      { "id": "website_update_drafting", "name": "Portfolio & Case Study Draft Generation" },
      { "id": "scoped_memory_retrieval", "name": "Scoped Context Memory Retrieval" }
    ],
    "authentication": {
      "type": "bearer_token"
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '2rem', border: '1px solid var(--accent-blue)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bot size={26} color="#38BDF8" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                A2A 1.0 Specification Agent Card
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Discovery Endpoint: <code style={{ color: '#FACC15' }}>/.well-known/agent-card.json</code></p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '1.25rem' }}>
          <ShieldCheck size={16} color="#38BDF8" style={{ display: 'inline', marginRight: '6px' }} />
          Interoperability standard allowing upstream orchestrators (e.g. <strong>Hermes</strong>) to discover capabilities without accessing private tools or un-scoped database memory.
        </div>

        <pre style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', overflowX: 'auto' }}>
          {JSON.stringify(agentCardJson, null, 2)}
        </pre>

      </div>
    </div>
  );
};
