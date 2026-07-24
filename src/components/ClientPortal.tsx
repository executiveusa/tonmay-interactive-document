import React, { useState } from 'react';
import { Project, ShotItem, InterviewQuestion, ProjectComment, Deliverable, PaymentRecord, UserContext } from '../types/schema';
import { filterCommentsForUser, filterShotItemsForUser } from '../utils/security';
import { CheckCircle2, Calendar, MapPin, Clock, DollarSign, Download, MessageSquare, Send, ShieldAlert, FileText } from 'lucide-react';

interface ClientPortalProps {
  currentUser: UserContext;
  project: Project;
  shotItems: ShotItem[];
  questions: InterviewQuestion[];
  comments: ProjectComment[];
  deliverables: Deliverable[];
  payments: PaymentRecord[];
  onAddComment: (content: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  currentUser,
  project,
  shotItems,
  questions,
  comments,
  deliverables,
  payments,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  // RLS Filtering: Clients NEVER see internal Macs notes or internal shot items
  const visibleComments = filterCommentsForUser(currentUser, comments);
  const visibleShots = filterShotItemsForUser(currentUser, shotItems);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECURITY BRAND BANNER */}
      <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--primary-gold)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold">CLIENT PORTAL</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Verified Client Workspace</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#F8FAFC' }}>
              {project.name}
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Produced by <strong style={{ color: '#FACC15' }}>TonMay Productions</strong> • Seattle, WA
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-green" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              Stage: {project.stage}
            </span>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.5rem' }}>
              Client Account: {currentUser.name}
            </div>
          </div>
        </div>

        {/* Shoot Location & Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={20} color="#FACC15" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Shoot Date</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>{project.date || 'To Be Scheduled'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={20} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Call Time</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>{project.time || '12:00 PM PST'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={20} color="#22C55E" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Venue Location</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>{project.location}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{project.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: SHOT LIST & DELIVERABLES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        
        {/* Approved Shot List */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.25rem' }}>
            Production Shot List
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Review approved visual coverage planned for your session.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {visibleShots.map((item) => (
              <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>{item.title}</span>
                  <span className="badge badge-blue">{item.category}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>{item.description}</p>
                {item.subject && (
                  <div style={{ fontSize: '0.75rem', color: '#FACC15', fontWeight: 600 }}>
                    Subject: {item.subject}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Payment Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Payment Status Card */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={20} color="#22C55E" />
              <span>Payment & Deposit Status</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              25% Deposit required to secure booking.
            </p>

            <div style={{ background: 'rgba(34, 197, 94, 0.08)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>25% Deposit ($600.00):</span>
                <span style={{ fontWeight: 700, color: '#22C55E' }}>VERIFIED PAID</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Remaining Balance ($1,800.00):</span>
                <span style={{ fontWeight: 700, color: '#FACC15' }}>Due Upon Final Delivery</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94A3B8', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px' }}>
              💡 Cash App Cashtag: <strong style={{ color: '#F8FAFC' }}>$tonmayprod</strong> • Manual receipt verification by Anton.
            </div>
          </div>

          {/* Project Deliverables */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#38BDF8" />
              <span>Project Deliverables</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              {deliverables.map((d) => (
                <div key={d.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F8FAFC' }}>{d.title}</span>
                    <span className="badge badge-purple">{d.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                    Format: {d.format} • {d.watermarked ? 'Watermarked Preview Phase' : 'Master Unlocked'}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* COMMENTS & CLIENT FEEDBACK */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={20} color="#FACC15" />
          <span>Client Communication & Feedback</span>
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
          Leave notes, questions, or revision suggestions directly for Anton.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {visibleComments.map((c) => (
            <div key={c.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FACC15' }}>{c.author_name}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>{c.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendComment} style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder="Type a message or question for Anton..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              color: '#F8FAFC',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.88rem'
            }}
          />
          <button type="submit" className="btn-primary">
            <Send size={16} />
            <span>Send Note</span>
          </button>
        </form>
      </div>

    </div>
  );
};
