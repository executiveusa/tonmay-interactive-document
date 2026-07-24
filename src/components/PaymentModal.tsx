import React, { useState } from 'react';
import { Project, PaymentRecord } from '../types/schema';
import { DollarSign, X, CheckCircle2, ShieldCheck, Copy, Check, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  project: Project;
  onRecordPayment: (payment: Omit<PaymentRecord, 'id' | 'organization_id' | 'client_id' | 'project_id' | 'created_at'>) => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ project, onRecordPayment, onClose }) => {
  const [amount, setAmount] = useState((project.total_quote_cents * project.deposit_percentage) / 10000);
  const [type, setType] = useState<'deposit' | 'balance'>('deposit');
  const [provider, setProvider] = useState<'cashapp' | 'stripe_manual' | 'bank_transfer'>('cashapp');
  const [copiedCashtag, setCopiedCashtag] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const handleCopyCashtag = () => {
    navigator.clipboard.writeText('$tonmayprod');
    setCopiedCashtag(true);
    setTimeout(() => setCopiedCashtag(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordPayment({
      type,
      amount_cents: Math.round(amount * 100),
      provider,
      status: 'verified',
      reference_note: `${type.toUpperCase()} payment verified via ${provider.toUpperCase()}`
    });
    setRecorded(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', padding: '2rem', border: '1px solid var(--accent-green)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <DollarSign size={24} color="#22C55E" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Payment & Deposit Management
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{project.name} • Quote: ${(project.total_quote_cents / 100).toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Cash App & Stripe Status Box */}
        <div style={{ background: 'rgba(34, 197, 94, 0.08)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(34, 197, 94, 0.25)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Primary Payment Method</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Cash App Cashtag:</span>
              <code style={{ color: '#22C55E' }}>$tonmayprod</code>
              <button onClick={handleCopyCashtag} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                {copiedCashtag ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
                <span>{copiedCashtag ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
              <CreditCard size={12} style={{ marginRight: '4px' }} /> Stripe Scaffold Disabled
            </span>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>STRIPE_ENABLED=false</div>
          </div>
        </div>

        {recorded ? (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
            <CheckCircle2 size={36} color="#22C55E" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>Payment Recorded Successfully</h4>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
              The project balance and payment history have been updated in the ledger.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: '1.25rem' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Payment Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.7rem', borderRadius: '8px', fontSize: '0.88rem' }}
                >
                  <option value="deposit">25% Deposit ($600.00)</option>
                  <option value="balance">Remaining Balance ($1,800.00)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Amount ($ USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.7rem', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Provider / Method</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', color: '#F8FAFC', padding: '0.7rem', borderRadius: '8px', fontSize: '0.88rem' }}
              >
                <option value="cashapp">Cash App ($tonmayprod)</option>
                <option value="stripe_manual">Manual Card Entry (Stripe Scaffold)</option>
                <option value="bank_transfer">Bank Transfer / Check</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              Record Payment Receipt
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
