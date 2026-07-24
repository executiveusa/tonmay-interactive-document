import React, { useState } from 'react';
import { Project } from '../types/schema';
import { HardDrive, X, CheckSquare, Square, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FootageIngestModalProps {
  project: Project;
  onClose: () => void;
}

export const FootageIngestModal: React.FC<FootageIngestModalProps> = ({ project, onClose }) => {
  const [items, setItems] = useState([
    { id: 'c1', label: 'Camera A (Main 4K RAW) offloaded to Primary Hard Drive', done: true },
    { id: 'c2', label: 'Camera B (50mm Prime B-roll) offloaded to Primary Hard Drive', done: true },
    { id: 'c3', label: 'Audio WAV (Lavalier & Room Mics) offloaded to 04_CAMERA_ORIGINALS/AUDIO/', done: true },
    { id: 'c4', label: 'Drone 4K Aerial D-Log cards offloaded to 04_CAMERA_ORIGINALS/DRONE/', done: false },
    { id: 'c5', label: 'MD5 Checksums verified across hard drive & Google Drive backup', done: false },
    { id: 'c6', label: 'H.264 / ProRes Proxy files generated in 05_PROXIES/', done: false }
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const completedCount = items.filter((i) => i.done).length;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', padding: '2rem', border: '1px solid var(--primary-gold)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HardDrive size={24} color="#FACC15" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Memory Card Ingest & Offload Checklist
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.name} • {completedCount}/{items.length} Tasks Verified</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.25)', fontSize: '0.8rem', color: '#FCA5A5', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} color="#EF4444" />
          <span><strong>HARD RULE:</strong> Never format or delete original camera cards until double backup is verified!</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {item.done ? <CheckSquare size={18} color="#22C55E" /> : <Square size={18} color="#64748B" />}
              <span style={{ fontSize: '0.88rem', color: item.done ? '#F8FAFC' : '#94A3B8', textDecoration: item.done ? 'line-through' : 'none' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-primary">Save Ingest State</button>
        </div>

      </div>
    </div>
  );
};
