import React, { useState } from 'react';
import { Project, ShotItem, InterviewQuestion, ProjectComment, Deliverable, PaymentRecord, ReminderLog, UserContext } from '../types/schema';
import { filterCommentsForUser, filterShotItemsForUser } from '../utils/security';
import { Plus, CheckCircle2, Lock, Eye, FolderPlus, Bell, DollarSign, MessageSquare, Send, ArrowLeft, Shield } from 'lucide-react';

interface ProjectWorkspaceProps {
  currentUser: UserContext;
  project: Project;
  shotItems: ShotItem[];
  questions: InterviewQuestion[];
  comments: ProjectComment[];
  deliverables: Deliverable[];
  payments: PaymentRecord[];
  reminders: ReminderLog[];
  onBackToDashboard: () => void;
  onAddShotItem: (item: Omit<ShotItem, 'id' | 'organization_id' | 'client_id' | 'project_id'>) => void;
  onAddComment: (content: string, isInternalOnly: boolean) => void;
  onOpenFolderPlan: () => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  currentUser,
  project,
  shotItems,
  questions,
  comments,
  deliverables,
  payments,
  reminders,
  onBackToDashboard,
  onAddShotItem,
  onAddComment,
  onOpenFolderPlan
}) => {
  const [activeTab, setActiveTab] = useState<'shots' | 'interviews' | 'comments' | 'reminders' | 'payments'>('shots');
  const [newShotTitle, setNewShotTitle] = useState('');
  const [newShotDesc, setNewShotDesc] = useState('');
  const [newShotCategory, setNewShotCategory] = useState<ShotItem['category']>('Hero');
  const [isInternalShot, setIsInternalShot] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);

  const visibleShots = filterShotItemsForUser(currentUser, shotItems);
  const visibleComments = filterCommentsForUser(currentUser, comments);

  const handleCreateShot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShotTitle.trim()) return;
    onAddShotItem({
      title: newShotTitle,
      category: newShotCategory,
      description: newShotDesc,
      status: 'Approved',
      is_internal_only: isInternalShot
    });
    setNewShotTitle('');
    setNewShotDesc('');
    setIsInternalShot(false);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText, isInternalComment);
    setCommentText('');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem 4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* HEADER & NAV */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={onBackToDashboard} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onOpenFolderPlan} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            <FolderPlus size={16} color="#FACC15" />
            <span>Generate Folder Plan</span>
          </button>
        </div>
      </div>

      {/* PROJECT TITLE CARD */}
      <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--primary-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-gold">{project.stage}</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.service_types.join(' • ')}</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#F8FAFC' }}>
              {project.name}
            </h2>
            {project.slogan && <p style={{ fontSize: '0.95rem', color: '#CBD5E1', fontStyle: 'italic', marginTop: '0.2rem' }}>"{project.slogan}"</p>}
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.5rem' }}>
              📍 {project.location} ({project.address}) • Date: {project.date} ({project.time})
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Primary Project Subjects</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FACC15', marginTop: '0.25rem' }}>
              {project.subjects?.join(', ') || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* WORKSPACE TAB NAV */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('shots')}
          className={activeTab === 'shots' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          Shot List ({visibleShots.length})
        </button>
        <button
          onClick={() => setActiveTab('interviews')}
          className={activeTab === 'interviews' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          Interview Guides ({questions.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={activeTab === 'comments' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          Comments & Notes ({visibleComments.length})
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={activeTab === 'reminders' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          Reminder Log ({reminders.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={activeTab === 'payments' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          Payment Ledger
        </button>
      </div>

      {/* TAB CONTENT: SHOT LIST */}
      {activeTab === 'shots' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Add New Shot Form (For Anton / Macs) */}
          {currentUser.role !== 'client_contact' && (
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} color="#FACC15" />
                <span>Add Shot to List</span>
              </h3>
              <form onSubmit={handleCreateShot} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px auto', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>Shot Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Barber detail clipper macro shot..."
                    value={newShotTitle}
                    onChange={(e) => setNewShotTitle(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.55rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>Description</label>
                  <input
                    type="text"
                    placeholder="Framing details..."
                    value={newShotDesc}
                    onChange={(e) => setNewShotDesc(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.55rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                  <select
                    value={newShotCategory}
                    onChange={(e) => setNewShotCategory(e.target.value as any)}
                    style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.55rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="Hero">Hero</option>
                    <option value="Interview">Interview</option>
                    <option value="B-roll">B-roll</option>
                    <option value="Drone">Drone</option>
                    <option value="Selects">Selects</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isInternalShot} onChange={(e) => setIsInternalShot(e.target.checked)} />
                    <span>Internal Only</span>
                  </label>
                  <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1rem' }}>Add Shot</button>
                </div>
              </form>
            </div>
          )}

          {/* Shot Items Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {visibleShots.map((shot) => (
              <div key={shot.id} className="glass-panel" style={{ padding: '1.25rem', borderLeft: shot.is_internal_only ? '3px solid var(--accent-purple)' : '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#F8FAFC' }}>{shot.title}</span>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                    {shot.is_internal_only && (
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        <Lock size={12} style={{ marginRight: '3px' }} /> Internal Note
                      </span>
                    )}
                    <span className="badge badge-gold">{shot.category}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>{shot.description}</p>
                {shot.subject && <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Target Subject: {shot.subject}</div>}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB CONTENT: INTERVIEWS */}
      {activeTab === 'interviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q) => (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-blue">Target: {q.target_subject}</span>
                <span className="badge badge-green">{q.status}</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.5rem' }}>
                "{q.question}"
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                Story Goal: {q.purpose}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: COMMENTS & NOTES */}
      {activeTab === 'comments' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {visibleComments.map((c) => (
              <div key={c.id} style={{ background: c.is_internal_only ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: c.is_internal_only ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: c.is_internal_only ? '#A855F7' : '#FACC15' }}>{c.author_name}</span>
                    {c.is_internal_only && <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>MACS INTERNAL</span>}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{new Date(c.created_at).toLocaleTimeString()}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>{c.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendComment} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <textarea
              placeholder="Write a project note or reply..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {currentUser.role !== 'client_contact' ? (
                <label style={{ fontSize: '0.8rem', color: '#A855F7', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={isInternalComment} onChange={(e) => setIsInternalComment(e.target.checked)} />
                  <span>Internal Note (Hidden from Client)</span>
                </label>
              ) : <div />}
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Post Comment</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: REMINDER ENGINE */}
      {activeTab === 'reminders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#A855F7', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} />
              <span>Automated Reminder Schedule (48h / 24h / Same-Day)</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              All notifications default to <strong style={{ color: '#FACC15' }}>dry-run mode</strong> to ensure no unwanted SMS/Email is sent during prototype operations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {reminders.map((r) => (
              <div key={r.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-gold">{r.type.toUpperCase()} REMINDER</span>
                  <span className="badge badge-purple">{r.status.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Channel: {r.channel.toUpperCase()} → {r.recipient}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Scheduled Delivery: {r.scheduled_for}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC' }}>Payment Breakdown</h4>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Total Quote: ${(project.total_quote_cents / 100).toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-green">Cash App: $tonmayprod</span>
              <span className="badge badge-purple">Stripe: Scaffold Disabled</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {payments.map((p) => (
              <div key={p.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.9rem' }}>
                    {p.type.toUpperCase()} PAYMENT (${(p.amount_cents / 100).toLocaleString()})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{p.reference_note}</div>
                </div>
                <span className="badge badge-green">{p.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
