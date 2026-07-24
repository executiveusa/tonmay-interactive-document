import React from 'react';
import { Project } from '../types/schema';
import { Folder, X, Copy, Check } from 'lucide-react';

interface FootageFolderModalProps {
  project: Project;
  onClose: () => void;
}

export const FootageFolderModal: React.FC<FootageFolderModalProps> = ({ project, onClose }) => {
  const clientSlug = 'ASC3ND_COLLECTIVE';
  const projectSlug = 'COMMUNITY_CUTS_2026';

  const folderStructure = [
    { folder: `${clientSlug}/${projectSlug}/01_ADMIN/`, desc: 'Contracts, receipts, client questionnaires' },
    { folder: `${clientSlug}/${projectSlug}/02_BRIEF/`, desc: 'Creative references, brand assets, shot list' },
    { folder: `${clientSlug}/${projectSlug}/03_PREPRODUCTION/`, desc: 'Call sheets, location permits, schedule' },
    { folder: `${clientSlug}/${projectSlug}/04_CAMERA_ORIGINALS/CAMERA_A/`, desc: 'Main A-cam high-res raw cards' },
    { folder: `${clientSlug}/${projectSlug}/04_CAMERA_ORIGINALS/CAMERA_B/`, desc: 'Secondary B-cam detail/reaction cards' },
    { folder: `${clientSlug}/${projectSlug}/04_CAMERA_ORIGINALS/AUDIO/`, desc: 'Lavalier & room audio WAV recordings' },
    { folder: `${clientSlug}/${projectSlug}/04_CAMERA_ORIGINALS/DRONE/`, desc: 'Aerial 4K D-Log footage files' },
    { folder: `${clientSlug}/${projectSlug}/05_PROXIES/`, desc: 'ProRes Proxy / H.264 lightweight edit files' },
    { folder: `${clientSlug}/${projectSlug}/06_PROJECT_FILES/`, desc: 'Premiere Pro / DaVinci Resolve project files' },
    { folder: `${clientSlug}/${projectSlug}/07_EXPORTS/REVIEW/`, desc: 'Watermarked client review cuts' },
    { folder: `${clientSlug}/${projectSlug}/07_EXPORTS/FINAL/`, desc: 'Master ProRes 4444 & H.264 exports' },
    { folder: `${clientSlug}/${projectSlug}/07_EXPORTS/SOCIAL/`, desc: 'Vertical 9:16 reels for IG/TikTok' },
    { folder: `${clientSlug}/${projectSlug}/08_DELIVERY/`, desc: 'Released client download bundle' },
    { folder: `${clientSlug}/${projectSlug}/09_ARCHIVE/`, desc: 'Cold storage archive manifest & checksums' }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '750px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '2rem', border: '1px solid var(--primary-gold)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Folder size={24} color="#FACC15" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Standardized Footage Folder Plan
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.name} • Hard Drive & Drive Storage Blueprint</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {folderStructure.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{ color: '#FACC15' }}>{item.folder}</span>
              <span style={{ color: '#64748B' }}># {item.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(250, 204, 21, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(250, 204, 21, 0.2)', fontSize: '0.8rem', color: '#CBD5E1' }}>
          ⚠️ <strong>HARD RULE:</strong> Never autonomously delete original camera cards or RAW footage files.
        </div>

      </div>
    </div>
  );
};
