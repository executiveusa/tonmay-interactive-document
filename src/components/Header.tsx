import React from 'react';
import { UserContext, UserRole } from '../types/schema';
import { Camera, ShieldCheck, UserCheck, Bot, FileCode } from 'lucide-react';

interface HeaderProps {
  currentUser: UserContext;
  onSwitchUser: (user: UserContext) => void;
  onOpenA2AModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onSwitchUser, onOpenA2AModal }) => {
  const users: UserContext[] = [
    {
      id: 'usr_anton',
      name: 'Anton',
      email: 'anton@tonmayproductions.com',
      role: 'tonmay_owner',
      organization_id: 'org_tonmay_prod'
    },
    {
      id: 'usr_macs',
      name: 'Macs Digital Media',
      email: 'team@macsdigitalmedia.com',
      role: 'macs_collaborator',
      organization_id: 'org_tonmay_prod'
    },
    {
      id: 'usr_asc3nd_client',
      name: 'Otha Minnifield (ASC3ND)',
      email: 'info@asc3nd.org',
      role: 'client_contact',
      organization_id: 'org_tonmay_prod',
      client_id: 'cli_asc3nd'
    }
  ];

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '1rem 2rem', marginBottom: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontWeight: 800 }}>
            <Camera size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
                TONMAY PRODUCTIONS
              </h1>
              <span className="badge badge-gold">STUDIO OS v1</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Seattle & Pacific Northwest Professional Media Studio
            </p>
          </div>
        </div>

        {/* Right Section: Role Simulator & A2A Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <button onClick={onOpenA2AModal} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
            <Bot size={16} color="#FACC15" />
            <span>A2A 1.0 Agent Card</span>
          </button>

          {/* RLS Role Switcher */}
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.35rem 0.65rem', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="#38BDF8" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8' }}>Active View Role:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = users.find((u) => u.id === e.target.value);
                if (found) onSwitchUser(found);
              }}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#F8FAFC',
                border: '1px solid var(--border-highlight)',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="usr_anton">Anton (TonMay Owner View)</option>
              <option value="usr_macs">Macs Digital Media (Internal Collaborator View)</option>
              <option value="usr_asc3nd_client">ASC3ND Collective (Client Portal View)</option>
            </select>
          </div>

        </div>

      </div>
    </header>
  );
};
