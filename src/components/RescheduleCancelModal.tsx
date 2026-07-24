import React, { useState } from 'react';
import { Project } from '../types/schema';
import { Calendar, AlertTriangle, X, CheckCircle2, Clock } from 'lucide-react';

interface RescheduleCancelModalProps {
  project: Project;
  mode: 'reschedule' | 'cancel';
  onClose: () => void;
}

export const RescheduleCancelModal: React.FC<RescheduleCancelModalProps> = ({ project, mode, onClose }) => {
  const [requestedDate, setRequestedDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '2rem', border: mode === 'cancel' ? '1px solid var(--accent-purple)' : '1px solid var(--primary-gold)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {mode === 'cancel' ? <AlertTriangle size={24} color="#EF4444" /> : <Calendar size={24} color="#FACC15" />}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                {mode === 'cancel' ? 'Cancel Session Request' : 'Request Session Reschedule'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.name} • Signed Link Action</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
            <CheckCircle2 size={36} color="#22C55E" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.35rem' }}>
              {mode === 'cancel' ? 'Cancellation Request Received' : 'Reschedule Request Sent'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
              {mode === 'cancel'
                ? 'Anton has been notified. Any deposit refund or session hold policy will follow studio terms.'
                : 'Your requested date change has been submitted to Anton for scheduling approval.'}
            </p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: '1.25rem' }}>
              Return to Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {mode === 'reschedule' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>
                  Proposed New Date & Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saturday, September 5, 2026 at 2:00 PM PST"
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  required
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>
                Reason / Note for Anton
              </label>
              <textarea
                rows={3}
                placeholder="Add any context for Anton..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary" style={{ background: mode === 'cancel' ? '#EF4444' : undefined, color: mode === 'cancel' ? '#FFF' : undefined }}>
                Submit Request
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
