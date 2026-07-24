import React, { useState } from 'react';
import { Project, ReminderLog } from '../types/schema';
import { Bell, X, Send, Mail, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReminderSimulatorModalProps {
  project: Project;
  reminders: ReminderLog[];
  onClose: () => void;
}

export const ReminderSimulatorModal: React.FC<ReminderSimulatorModalProps> = ({ project, reminders, onClose }) => {
  const [selectedReminder, setSelectedReminder] = useState<ReminderLog>(reminders[0] || {
    id: 'rem_1',
    organization_id: 'org_tonmay_prod',
    client_id: 'cli_asc3nd',
    project_id: project.id,
    type: '48h',
    channel: 'email',
    recipient: 'info@asc3nd.org',
    status: 'dry_run',
    scheduled_for: '2026-08-28T12:00:00Z'
  });

  const [testSent, setTestSent] = useState(false);

  const getTemplateText = (type: string, channel: string) => {
    if (channel === 'email') {
      return `Subject: Upcoming TonMay Production Shoot: ${project.name} (${type.toUpperCase()} Reminder)\n\nHi Otha,\n\nThis is an automated reminder for your upcoming session with TonMay Productions on ${project.date} at ${project.time}.\n\nLocation: ${project.location} (${project.address})\n\nActions:\n- Confirm Shoot: https://tonmayproductions.com/confirm?token=sig_48h_abc\n- Request Reschedule: https://tonmayproductions.com/reschedule?token=sig_48h_abc\n- Cancel Session: https://tonmayproductions.com/cancel?token=sig_48h_abc`;
    } else {
      return `[TonMay Productions] Reminder: Your ${project.name} shoot is scheduled for ${project.date} at ${project.time} at ${project.location}. Reply CONFIRM or visit https://tonmay.app/c/sig_24h to request reschedule.`;
    }
  };

  const handleSimulateDryRun = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '750px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '2rem', border: '1px solid var(--accent-purple)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={24} color="#A855F7" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Automated Reminder Engine Simulator
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.name} • Dry-Run Notification Templates</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: 'rgba(168, 85, 247, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.25)', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '1.25rem' }}>
          <ShieldCheck size={16} color="#A855F7" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>DRY-RUN SAFETY GATE:</strong> Live SMS/Email messages are disabled. All tests generate logged preview payloads only.
        </div>

        {/* Reminder Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {['48h', '24h', 'same_day'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedReminder({ ...selectedReminder, type: type as any })}
              className={selectedReminder.type === type ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              {type.toUpperCase()} Reminder
            </button>
          ))}
        </div>

        {/* Template Preview */}
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#94A3B8' }}>
            <span>Channel: <strong style={{ color: '#FACC15' }}>{selectedReminder.channel.toUpperCase()}</strong></span>
            <span>Recipient: <strong style={{ color: '#F8FAFC' }}>{selectedReminder.recipient}</strong></span>
          </div>

          <pre style={{ color: '#CBD5E1', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
            {getTemplateText(selectedReminder.type, selectedReminder.channel)}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {testSent ? (
            <div style={{ color: '#22C55E', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} />
              <span>Dry-Run Notification Logged Successfully!</span>
            </div>
          ) : <div />}

          <button onClick={handleSimulateDryRun} className="btn-primary">
            <Send size={16} />
            <span>Simulate Dry-Run Delivery</span>
          </button>
        </div>

      </div>
    </div>
  );
};
