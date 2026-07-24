import React, { useState } from 'react';
import { Project } from '../types/schema';
import { GitBranch, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface WebsitePrModalProps {
  project: Project;
  onClose: () => void;
}

export const WebsitePrModal: React.FC<WebsitePrModalProps> = ({ project, onClose }) => {
  const [created, setCreated] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', padding: '2rem', border: '1px solid var(--accent-blue)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <GitBranch size={24} color="#38BDF8" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Website Update PR Proposal Builder
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Target Repo: <code>https://github.com/executiveusa/tonmay-productions.git</code></p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '1.25rem' }}>
          <ShieldAlert size={16} color="#38BDF8" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>HUMAN-GATED PRODUCTION GATE:</strong> Creating this pull request submits a branch for Jeremy/Bambú review. It will <strong>NOT</strong> auto-publish to production.
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
          <div>Branch: <span style={{ color: '#FACC15' }}>feat/asc3nd-community-cuts-case-study</span></div>
          <div>PR Title: Add ASC3ND Community Cuts Event Case Study & Photo Selects</div>
          <div>Target: main</div>
        </div>

        {created ? (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22C55E', textAlign: 'center' }}>
            <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto' }} />
            <div><strong>PR Proposal Branch Created!</strong> Awaiting human approval.</div>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: '1rem' }}>Close</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button onClick={() => setCreated(true)} className="btn-primary">Generate Git PR Branch</button>
          </div>
        )}

      </div>
    </div>
  );
};
