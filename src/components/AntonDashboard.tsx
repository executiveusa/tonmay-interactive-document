import React from 'react';
import { Project, Client, Deliverable, PaymentRecord, ReminderLog } from '../types/schema';
import { Calendar, AlertCircle, Clock, DollarSign, Film, MessageSquare, Plus, FolderPlus, Bell, CheckCircle2, ChevronRight } from 'lucide-react';

interface AntonDashboardProps {
  projects: Project[];
  clients: Client[];
  deliverables: Deliverable[];
  payments: PaymentRecord[];
  reminders: ReminderLog[];
  onSelectProject: (projectId: string) => void;
  onOpenFolderPlan: (project: Project) => void;
  onOpenAssistant: () => void;
}

export const AntonDashboard: React.FC<AntonDashboardProps> = ({
  projects,
  clients,
  deliverables,
  payments,
  reminders,
  onSelectProject,
  onOpenFolderPlan,
  onOpenAssistant
}) => {
  const upcomingShoots = projects.filter((p) => p.stage === 'Booked' || p.stage === 'Shoot scheduled');
  const editingProjects = projects.filter((p) => p.stage === 'Editing');
  const unpaidDeposits = projects.filter((p) => p.deposit_paid_cents < (p.total_quote_cents * p.deposit_percentage) / 100);
  const pendingReminders = reminders.filter((r) => r.status === 'dry_run');

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem 3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Banner & Quick Actions */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(22, 26, 36, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)', borderLeft: '4px solid var(--primary-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.35rem' }}>
              Welcome back, Anton.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
              TonMay Studio Overview • Seattle & PNW Media Production Command Center
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onOpenAssistant}>
              <MessageSquare size={18} />
              <span>Ask Studio Assistant</span>
            </button>
            <button className="btn-secondary" onClick={() => onSelectProject(projects[0]?.id || '')}>
              <Plus size={18} />
              <span>Add New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* KRUG QUESTIONS - INSTANT STATUS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        {/* Today & Upcoming Shoots */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(250, 204, 21, 0.1)', borderRadius: '8px', color: '#FACC15' }}>
              <Calendar size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>Upcoming Shoots</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Next scheduled sessions</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {upcomingShoots.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>{p.name}</span>
                  <span className="badge badge-gold">{p.stage}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Clock size={14} />
                  <span>{p.date} • {p.time}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                  📍 {p.location} ({p.address})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit & Payment Status */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', color: '#22C55E' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>Payment Status</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Deposits & remaining balances</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {projects.map((p) => {
              const depPaid = p.deposit_paid_cents / 100;
              const total = p.total_quote_cents / 100;
              const isPaid = depPaid >= (total * p.deposit_percentage) / 100;
              return (
                <div key={p.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F8FAFC' }}>{p.name}</span>
                    <span className={isPaid ? 'badge badge-green' : 'badge badge-purple'}>
                      {isPaid ? '25% Deposit Paid' : 'Deposit Pending'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    Deposit: ${depPaid.toLocaleString()} / Total Quote: ${total.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editing & Review Pipeline */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', color: '#38BDF8' }}>
              <Film size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>Post-Production Pipeline</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Deliverables in edit & review</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {deliverables.map((d) => (
              <div key={d.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#F8FAFC' }}>{d.title}</span>
                  <span className="badge badge-blue">{d.status}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Format: {d.format} • Watermarked Preview Active
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders & Automation Queue */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', color: '#A855F7' }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>Reminder Engine</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Automated 48h / 24h / Same-day dry-runs</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pendingReminders.map((r) => (
              <div key={r.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#F8FAFC' }}>{r.type.toUpperCase()} Client Reminder</span>
                  <span className="badge badge-purple">Dry Run</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Channel: {r.channel.toUpperCase()} → {r.recipient}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MAIN ACTIVE PROJECTS LIST */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Active Client Workspaces</span>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>({projects.length} Total)</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map((proj) => {
            const client = clients.find((c) => c.id === proj.client_id);
            return (
              <div
                key={proj.id}
                className="glass-panel"
                style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC' }}>{proj.name}</h4>
                    <span className="badge badge-gold">{proj.stage}</span>
                    {proj.slogan && <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>"{proj.slogan}"</span>}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span>Client: <strong style={{ color: '#F8FAFC' }}>{client?.name}</strong></span>
                    <span>Date: <strong style={{ color: '#F8FAFC' }}>{proj.date || 'TBD'}</strong></span>
                    <span>Location: <strong style={{ color: '#F8FAFC' }}>{proj.location || 'TBD'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {proj.service_types.map((st) => (
                      <span key={st} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', color: '#CBD5E1' }}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button className="btn-secondary" onClick={() => onOpenFolderPlan(proj)} style={{ fontSize: '0.8rem' }}>
                    <FolderPlus size={16} />
                    <span>Footage Folder Plan</span>
                  </button>
                  <button className="btn-primary" onClick={() => onSelectProject(proj.id)}>
                    <span>Open Workspace</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
