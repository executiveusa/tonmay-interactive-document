import React, { useState } from 'react';
import { Project, Client, UserContext } from '../types/schema';
import { Bot, X, Sparkles, Send, GitBranch, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface StudioAssistantProps {
  currentUser: UserContext;
  projects: Project[];
  clients: Client[];
  onClose: () => void;
}

export const StudioAssistant: React.FC<StudioAssistantProps> = ({ currentUser, projects, clients, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; actionItem?: string }>>([
    {
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I am your TonMay Studio Assistant. I can help with session briefings, shot-list proposals, footage folder plans, and drafting website portfolio updates for tonmay-productions. What would you like to review today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [prDraftCreated, setPrDraftCreated] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      let replyText = '';
      let action = '';

      if (userText.toLowerCase().includes('website') || userText.toLowerCase().includes('pr') || userText.toLowerCase().includes('portfolio')) {
        replyText = `I have drafted a website update PR proposal for tonmay-productions repo based on the ASC3ND "Community Cuts for Kids" shoot:\n\n- Branch: feat/asc3nd-community-cuts-case-study\n- Title: Add ASC3ND Community Cuts Event Case Study\n- Status: Pending Human Approval (Jeremy/Bambú review)\n\nNote: Production deployment remains human-gated per studio protocol.`;
        setPrDraftCreated(true);
      } else if (userText.toLowerCase().includes('other client') || userText.toLowerCase().includes('leak') || userText.toLowerCase().includes('sound arts')) {
        if (currentUser.role === 'client_contact') {
          replyText = `[SECURITY DENIED] Access Restricted by Row Level Security (RLS). As an ASC3ND Collective representative, you cannot query Sound Arts Initiative memory or assets.`;
        } else {
          replyText = `As Anton/TonMay Owner, you have access to both ASC3ND Collective and Sound Arts Initiative project workspaces. Each workspace maintains strict data isolation boundaries.`;
        }
      } else {
        replyText = `Here is your production summary for ASC3ND Community Cuts:\n- Date: Sunday, August 30, 2026 (12 PM - 3 PM)\n- Location: Tangles & Locs, Everett WA\n- Pre-production: 5 Shots Approved, 2 Interview Guides Locked, 25% Deposit Verified ($600.00).\n- Reminders: 48h / 24h / Same-day dry-run schedule active.`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: replyText, actionItem: action }]);
    }, 600);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', padding: '1.5rem', border: '1px solid var(--primary-gold)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(250, 204, 21, 0.15)', borderRadius: '10px', color: '#FACC15' }}>
              <Bot size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC' }}>TonMay AI Studio Assistant</h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Scoped Memory & Studio Briefing Agent</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <button
            onClick={() => setInput('Draft website portfolio PR for ASC3ND shoot')}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            ✨ Draft Website PR Update
          </button>
          <button
            onClick={() => setInput('Check pre-production readiness for ASC3ND')}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            📋 ASC3ND Pre-prod Briefing
          </button>
          <button
            onClick={() => setInput('Attempt cross-client query to Sound Arts')}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            🔒 Test Cross-Client Isolation
          </button>
        </div>

        {/* Chat Messages Log */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'user' ? 'linear-gradient(135deg, #CA8A04 0%, #A16207 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                color: '#F8FAFC',
                padding: '0.85rem 1.1rem',
                borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                fontSize: '0.88rem',
                whiteSpace: 'pre-wrap'
              }}
            >
              {m.text}
            </div>
          ))}

          {prDraftCreated && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1rem', borderRadius: '10px', color: '#22C55E', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GitBranch size={20} />
              <div>
                <strong>PR Draft Generated:</strong> <code>feat/asc3nd-community-cuts-case-study</code> on <code>tonmay-productions</code>.
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>Awaiting human approval before merging.</div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <input
            type="text"
            placeholder="Ask TonMay Studio Assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.88rem' }}
          />
          <button type="submit" className="btn-primary">
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>

      </div>
    </div>
  );
};
