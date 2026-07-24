// TonMay Studio OS v1 — Schema & Domain Types

export type UserRole = 'tonmay_owner' | 'macs_collaborator' | 'client_contact';

export interface UserContext {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization_id: string;
  client_id?: string; // Set when user is a client_contact
}

export type ProjectLifecycleStage =
  | 'Lead'
  | 'Inquiry'
  | 'Discovery'
  | 'Quote sent'
  | 'Deposit pending'
  | 'Booked'
  | 'Pre-production'
  | 'Shoot scheduled'
  | 'Shoot complete'
  | 'Editing'
  | 'Client review'
  | 'Revisions'
  | 'Final delivery'
  | 'Paid'
  | 'Archived';

export type ServiceType =
  | 'People photography'
  | 'Videography'
  | 'Interviews'
  | 'Documentary'
  | 'Nonprofit / community media'
  | 'Drone';

export interface Client {
  id: string;
  organization_id: string;
  name: string;
  company_name?: string;
  email: string;
  phone?: string;
  notes?: string;
  created_at: string;
}

export interface Project {
  id: string;
  organization_id: string;
  client_id: string;
  name: string;
  slogan?: string;
  service_types: ServiceType[];
  stage: ProjectLifecycleStage;
  deposit_percentage: number;
  total_quote_cents: number;
  deposit_paid_cents: number;
  balance_paid_cents: number;
  date?: string;
  time?: string;
  location?: string;
  address?: string;
  subjects?: string[];
  created_at: string;
  updated_at: string;
}

export interface ShotItem {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  title: string;
  category: 'Interview' | 'B-roll' | 'Hero' | 'Drone' | 'Event' | 'Selects';
  subject?: string;
  description: string;
  status: 'Draft' | 'Approved' | 'Shot' | 'Delivered';
  is_internal_only: boolean;
}

export interface InterviewQuestion {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  target_subject: string;
  question: string;
  purpose: string;
  status: 'Proposed' | 'Approved' | 'Completed';
}

export interface ProjectComment {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  author_name: string;
  author_role: UserRole;
  is_internal_only: boolean; // Macs internal vs Client visible
  content: string;
  created_at: string;
}

export interface ReminderLog {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  type: '48h' | '24h' | 'same_day';
  channel: 'email' | 'sms';
  recipient: string;
  status: 'scheduled' | 'sent' | 'dry_run';
  scheduled_for: string;
  sent_at?: string;
}

export interface Deliverable {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  title: string;
  format: 'Horizontal 4K' | 'Vertical Social' | 'Audio Master' | 'Raw Selects';
  status: 'In Edit' | 'Client Review' | 'Approved' | 'Released';
  preview_url?: string;
  download_url?: string;
  watermarked: boolean;
  released_at?: string;
}

export interface PaymentRecord {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  type: 'deposit' | 'balance';
  amount_cents: number;
  provider: 'cashapp' | 'stripe_manual' | 'bank_transfer';
  status: 'pending' | 'received' | 'verified';
  reference_note?: string;
  created_at: string;
}

export interface FootageFolderPlan {
  organization_id: string;
  client_id: string;
  project_id: string;
  client_slug: string;
  project_slug: string;
  structure: {
    folder: string;
    description: string;
  }[];
}
